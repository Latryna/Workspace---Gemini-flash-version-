
import React, { useState, useEffect } from 'react';
import type { GithubFile } from '../types';
import { FileIcon, FolderIcon } from './icons/Icons';

const GITHUB_REPO_API = 'https://api.github.com/repos/Latryna/titans-legal-docs/contents/';

const LegalPanel: React.FC = () => {
    const [files, setFiles] = useState<GithubFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepoContents = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(GITHUB_REPO_API);
                if (!response.ok) {
                    throw new Error(`GitHub API failed: ${response.status} ${response.statusText}`);
                }
                const data: GithubFile[] = await response.json();
                // Sort with directories first
                const sortedData = data.sort((a, b) => {
                    if (a.type === b.type) {
                        return a.name.localeCompare(b.name);
                    }
                    return a.type === 'dir' ? -1 : 1;
                });
                setFiles(sortedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch repository contents.');
            } finally {
                setLoading(false);
            }
        };
        fetchRepoContents();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <div className="text-center text-gray-400">Loading repository contents...</div>;
        }
        if (error) {
            return <div className="text-center text-red-400">Error: {error}</div>;
        }
        return (
            <ul className="space-y-1">
                {files.map(file => (
                    <li key={file.sha}>
                        <a 
                            href={file.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-700/50 transition-colors"
                        >
                            {file.type === 'dir' ? <FolderIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" /> : <FileIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                            <span className="truncate">{file.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex-1 flex flex-col bg-slate-800/50">
            <header className="flex items-center justify-between p-4 border-b border-slate-700/80">
                <h1 className="text-xl font-semibold">TITANS Legal Documentation</h1>
                <a 
                    href="https://github.com/Latryna/titans-legal-docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-400 hover:underline"
                >
                    View on GitHub
                </a>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default LegalPanel;
