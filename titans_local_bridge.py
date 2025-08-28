"""
FastAPI application that bridges the TITANS AI Workspace to local
resources and LM Studio.  This service exposes three categories of
endpoints:

1.  `/chat` proxies chat completion requests to LM Studio's
    OpenAI-compatible API, returning the raw JSON response.  The
    LM Studio base URL and default model can be configured via
    environment variables (`LM_BASE` and `LM_MODEL`).
2.  `/local/dir` lists the contents of a directory on the host
    filesystem.
3.  `/local/read` reads the contents of a text file on the host.
4.  `/local/run` executes a shell command on the host and returns the
    exit code, stdout and stderr.  Operators should limit the set of
    permissible commands via a wrapper or by constraining the
    environment in which this service runs.

By separating these operations behind an HTTP interface, the
application maintains a clean boundary between local resources and
external agents that may connect through the TITANS platform.
"""

import os
import subprocess
from typing import Any, Dict

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='TITANS Local Bridge', version='0.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Base URL for LM Studio's OpenAI-compatible server
LM_BASE: str = os.getenv('LM_BASE', 'http://127.0.0.1:5005')
# Default model identifier if none supplied by the client
LM_MODEL: str = os.getenv('LM_MODEL', 'mixtral-8x7b-instruct-v0.1')


@app.post('/chat')
def chat(body: Dict[str, Any]):
    """Proxy chat completion to LM Studio.

    Body must be a JSON object with a `messages` array and an
    optional `model` field.  The function forwards this to
    `LM_BASE/v1/chat/completions` and returns the response JSON.
    """
    model = body.get('model', LM_MODEL)
    messages = body.get('messages', [])
    payload = {'model': model, 'messages': messages}
    try:
        response = requests.post(
            f'{LM_BASE}/v1/chat/completions',
            json=payload,
            timeout=120,
        )
    except requests.RequestException as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return response.json()


@app.post('/local/dir')
def list_dir(body: Dict[str, Any]):
    """Return directory listing for the given path (defaults to cwd)."""
    path = body.get('path') or '.'
    try:
        entries = os.listdir(path)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return {'entries': entries}


@app.post('/local/read')
def read_file(body: Dict[str, Any]):
    """Return file contents as a string."""
    path = body.get('path')
    if not path:
        raise HTTPException(status_code=400, detail='Path is required')
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return {'content': content}


@app.post('/local/run')
def run_command(body: Dict[str, Any]):
    """Execute a shell command and return the exit code and output."""
    cmd = body.get('cmd')
    if not cmd:
        raise HTTPException(status_code=400, detail='cmd field is required')
    try:
        proc = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return {'rc': proc.returncode, 'out': proc.stdout, 'err': proc.stderr}