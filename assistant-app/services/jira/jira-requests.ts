"use server";

import { cookies } from "next/headers";
import { JiraProject, JiraIssue, JiraBoard, JiraSprint } from "./types";

async function makeAuthHeader() {
  const jiraAccessToken = (await cookies()).get("jira_access_token")?.value;
  return `Bearer ${jiraAccessToken}`;
}

export async function jiraRequest<T>(path: string): Promise<T> {
  const res = await fetch(`https://${config.domain}/rest/api/3${path}`, {
    headers: {
      Authorization: await makeAuthHeader(),
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Jira API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// Agile API endpoints (different base path!)
export async function jiraAgileRequest<T>(path: string): Promise<T> {
  const res = await fetch(`https://${config.domain}/rest/agile/1.0${path}`, {
    headers: {
      Authorization: makeAuthHeader(),
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Jira Agile API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getProjects(
  config: JiraAuthConfig,
): Promise<JiraProject[]> {
  const data = await jiraRequest<{ values: JiraProject[] }>(
    config,
    `/project/search`,
  );
  return data.values;
}

export async function getAllIssuesInProject(
  config: JiraAuthConfig,
  projectKey: string,
): Promise<JiraIssue[]> {
  const issues: JiraIssue[] = [];
  let startAt = 0;
  const maxResults = 100;

  while (true) {
    const data = await jiraRequest<{
      issues: JiraIssue[];
      startAt: number;
      maxResults: number;
      total: number;
    }>(
      config,
      `/search?jql=project=${projectKey}&maxResults=${maxResults}&startAt=${startAt}`,
    );

    issues.push(...data.issues);

    if (data.startAt + data.maxResults >= data.total) break;
    startAt += maxResults;
  }

  return issues;
}

export async function getBoards(config: JiraAuthConfig): Promise<JiraBoard[]> {
  const data = await jiraAgileRequest<{ values: JiraBoard[] }>(
    config,
    `/board`,
  );
  return data.values;
}

export async function getSprints(
  config: JiraAuthConfig,
  boardId: number,
): Promise<JiraSprint[]> {
  const data = await jiraAgileRequest<{ values: JiraSprint[] }>(
    config,
    `/board/${boardId}/sprint`,
  );
  return data.values;
}

export async function getIssuesInSprint(
  config: JiraAuthConfig,
  sprintId: number,
): Promise<JiraIssue[]> {
  const data = await jiraAgileRequest<{ issues: JiraIssue[] }>(
    config,
    `/sprint/${sprintId}/issue`,
  );
  return data.issues;
}
