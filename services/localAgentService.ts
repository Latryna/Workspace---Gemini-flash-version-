// localAgentService.ts
//
// This service provides helper functions for interacting with the local
// agent bridge.  The bridge exposes a REST API that proxies chat
// requests to LM Studio and exposes a handful of safe system
// operations (directory listing, file read, and running simple shell
// commands).  These helpers wrap each endpoint behind a simple
// TypeScript function with sensible defaults and error handling.

import type { ChatMessage } from './types';

/**
 * Base URL for the local agent bridge.  When running within the
 * TITANS AI Workspace this value may be overridden via the
 * VITE_LOCAL_AGENT_BASE environment variable.  If no override is
 * provided, requests are sent to http://localhost:5051.
 */
const LOCAL_BASE: string =
  (import.meta as any).env?.VITE_LOCAL_AGENT_BASE ||
  (typeof process !== 'undefined' && (process as any).env?.VITE_LOCAL_AGENT_BASE) ||
  'http://localhost:5051';

/**
 * Send a chat completion request through the local agent bridge.  The
 * bridge will forward the messages to LM Studio's OpenAI-compatible
 * endpoint and return the raw JSON response.  A model name may be
 * provided to override the default configured on the bridge.
 *
 * @param messages Conversation history as an array of ChatMessage
 * @param model    Optional model name (defaults to the bridge default)
 */
export async function chatWithLocal(
  messages: ChatMessage[],
  model?: string,
): Promise<any> {
  const body = { messages, ...(model ? { model } : {}) };
  const resp = await fetch(`${LOCAL_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    throw new Error(`Local chat failed: ${resp.status} ${resp.statusText}`);
  }
  return resp.json();
}

/**
 * List the contents of a directory on the host.  The local bridge
 * restricts access to directories that the operator has permitted.
 *
 * @param path Directory path to list (defaults to current working directory)
 */
export async function listDirectory(path: string = '.'): Promise<{ entries: string[] }> {
  const resp = await fetch(`${LOCAL_BASE}/local/dir`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
  });
  if (!resp.ok) {
    throw new Error(`Directory listing failed: ${resp.status} ${resp.statusText}`);
  }
  return resp.json();
}

/**
 * Read the contents of a text file on the host.  The response
 * contains the raw file contents as a string.  Binary files are
 * unsupported and may return garbled output.
 *
 * @param path Path to the file to read
 */
export async function readFile(path: string): Promise<{ content: string }> {
  const resp = await fetch(`${LOCAL_BASE}/local/read`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
  });
  if (!resp.ok) {
    throw new Error(`File read failed: ${resp.status} ${resp.statusText}`);
  }
  return resp.json();
}

/**
 * Execute a shell command on the host.  Use with caution: only
 * commands permitted by the bridge's allow‑list will run.  The
 * response includes the return code, stdout and stderr.
 *
 * @param cmd Command line to execute
 */
export async function runCommand(cmd: string): Promise<{ rc: number; out: string; err: string }> {
  const resp = await fetch(`${LOCAL_BASE}/local/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd }),
  });
  if (!resp.ok) {
    throw new Error(`Command execution failed: ${resp.status} ${resp.statusText}`);
  }
  return resp.json();
}