const JIRA_CLIENT_ID = process.env.JIRA_CLIENT_ID;

export function openJiraOAuthWindow() {
  const width = 600;
  const height = 700;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const url = "/api/jira/auth"; // proxy route that redirects to Jira OAuth URL
  window.open(
    url,
    "jira-oauth",
    `width=${width},height=${height},left=${left},top=${top}`,
  );
}

export function getJiraOAuthURL(sessionId: string) {
  return `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${JIRA_CLIENT_ID}&scope=read%3Ajira-work%20read%3Ajira-user&redirect_uri=https%3A%2F%2Finternal-ai-knowledge-assistant.vercel.app%2Fapi%2Fjira%2Fcallback&state=${sessionId}&response_type=code&prompt=consent`;
}
