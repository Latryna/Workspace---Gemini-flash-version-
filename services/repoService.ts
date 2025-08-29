// Mock service for the Repository Specialist Agent (ChatGPT)

export async function* streamRepoResponse(
  prompt: string
): AsyncGenerator<string, void, undefined> {
  const commitHash = `0fa1afe${Math.random().toString(16).slice(2, 8)}`;
  const files = [
    'README_workspace.md',
    'api_specification.md',
    'architecture_diagram.tex',
    'TITANS_agent_interface.tex',
    'AI-studio-podsumowanie.tex'
  ];

  const response = `Commit: ${commitHash}\nFiles Synced:\n- ${files.join('\n- ')}`;

  // Simulate streaming to match the interface of other services
  const chunks = response.split(' ');
  for (const chunk of chunks) {
    yield chunk + ' ';
    await new Promise(res => setTimeout(res, 30));
  }
}
