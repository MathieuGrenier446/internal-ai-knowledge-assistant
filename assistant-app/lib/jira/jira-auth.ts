import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { JiraAccessibleResources } from "./types";
import { JIRA_PERMISSIONS, JIRA_REDIRECT_URL } from "./constants";

export async function generateSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("sessionId")?.value;

  if (sessionId === undefined) {
    cookieStore.set("sessionId", uuid(), {
      httpOnly: true, // Recommended for security, prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Use secure in production for HTTPS
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      path: "/", // Cookie accessible across the entire domain
      sameSite: "lax", // Or 'strict', 'none' depending on your requirements
    });
    sessionId = cookieStore.get("sessionId")?.value;
    if (sessionId === undefined)
      throw Error("Failed to generate session ID for Jira");
  }
  return sessionId;
}

export function getJiraOAuthURL(sessionId: string, jiraClientId: string) {
  return `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${jiraClientId}&scope=${JIRA_PERMISSIONS}&redirect_uri=${JIRA_REDIRECT_URL}&state=${sessionId}&response_type=code&prompt=consent`;
}

export async function setJiraAuthToken(accessToken: string, expiresIn: number) {
  const cookieStore = await cookies();
  cookieStore.set("jira_access_token", accessToken, { maxAge: expiresIn });
}

export async function getJiraAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("jira_access_token")?.value;
}

export async function getAccessibleResources() {
  const authToken = await getJiraAuthToken();
  const response = await fetch(
    "https://api.atlassian.com/oauth/token/accessible-resources",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    },
  );

  const data: JiraAccessibleResources = await response.json();

  if (!response.ok) {
    throw Error("Failed to fetch accessible Jira resources");
  }

  return data;
}

export async function setJiraCloudId() {
  const accessibleRessources = await getAccessibleResources();
  const firstAccessibleRessources = accessibleRessources[0];
  const cookieStore = await cookies();
  cookieStore.set("jira_cloud_id", firstAccessibleRessources.id);
}

export async function getJiraCloudId() {
  const cookieStore = await cookies();
  return cookieStore.get("jira_cloud_id")?.value;
}
