const JIRA_CLIENT_ID = process.env.JIRA_CLIENT_ID;

export function getJiraOAuthURL(sessionId: string) {
  return `https://auth.atlassian.com/authorize?audience=api.atlassian.com
  &client_id=${JIRA_CLIENT_ID}
  &scope=read%3Ajira-work%20read%3Ajira-user
  &redirect_uri=https%3A%2F%2Finternal-ai-knowledge-assistant.vercel.app%2F
  &state=${sessionId}
  &response_type=code&prompt=consent`;
}

export async function redirectToJiraOAuth() {
  window.location.href = "/api/jira";
}
