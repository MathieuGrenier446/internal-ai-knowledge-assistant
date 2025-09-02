import { getJiraConfig } from "./jira-configs";
import {
  JiraProject,
  JiraIssue,
  JiraBoard,
  JiraSprint,
  JiraAuthConfig,
} from "./types";

async function jiraRequest<T>(
  config: JiraAuthConfig,
  path: string,
): Promise<T> {
  const res = await fetch(
    `https://${config.domain}/${config.cloudId}/rest/api/3${path}`,
    {
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Jira API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

async function jiraAgileRequest<T>(
  config: JiraAuthConfig,
  path: string,
): Promise<T> {
  const res = await fetch(
    `https://${config.domain}/${config.cloudId}/rest/agile/1.0${path}`,
    {
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Jira Agile API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function createJiraClient() {
  const config = await getJiraConfig();
  return {
    async getProjects(): Promise<JiraProject[]> {
      const data = await jiraRequest<{ values: JiraProject[] }>(
        config,
        `/project/search`,
      );
      return data.values;
    },

    async getAllIssuesInProject(projectKey: string): Promise<JiraIssue[]> {
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
    },

    async getBoards(): Promise<JiraBoard[]> {
      const data = await jiraAgileRequest<{ values: JiraBoard[] }>(
        config,
        `/board`,
      );
      return data.values;
    },

    async getSprints(boardId: number): Promise<JiraSprint[]> {
      const data = await jiraAgileRequest<{ values: JiraSprint[] }>(
        config,
        `/board/${boardId}/sprint`,
      );
      return data.values;
    },

    async getIssuesInSprint(sprintId: number): Promise<JiraIssue[]> {
      const data = await jiraAgileRequest<{ issues: JiraIssue[] }>(
        config,
        `/sprint/${sprintId}/issue`,
      );
      return data.issues;
    },
  };
}
