import {
  JIRA_CALLBACK_URL,
  JIRA_CLIENT_ID,
  REQUIRED_SCOPES,
} from "./constants";

export function getJiraOAuthURL(sessionId: string) {
  return `https://auth.atlassian.com/authorize?
  audience=api.atlassian.com&
  client_id=${JIRA_CLIENT_ID}&
  scope=${REQUIRED_SCOPES}&
  redirect_uri=${JIRA_CALLBACK_URL}&
  state=${sessionId}&
  response_type=code&
  prompt=consent
`;
}

export async function redirectToJiraOAuth() {
  window.location.href = "/api/jira";
}
