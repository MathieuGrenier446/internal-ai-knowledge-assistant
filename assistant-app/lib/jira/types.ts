export interface JiraAuthConfig {
  accessToken: string;
  cloudId: string;
  domain: string;
}

interface JiraAccessibleResource {
  id: string;
  name: string;
  url: string;
  scopes: string[];
  avatarUrl: string;
}

export type JiraAccessibleResources = JiraAccessibleResource[];

export interface JiraProject {
  id: string;
  key: string;
  name: string;
}

export interface JiraIssue {
  id: string;
  key: string;
  fields: {
    summary: string;
    description?: string;
    status: { name: string };
    assignee?: { displayName: string };
  };
}

export interface JiraBoard {
  id: number;
  name: string;
  type: "scrum" | "kanban";
}

export interface JiraSprint {
  id: number;
  name: string;
  state: "active" | "closed" | "future";
}
