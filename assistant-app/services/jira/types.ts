export interface JiraAuthConfig {
  domain: string; // e.g. "your-domain.atlassian.net"
  email: string; // your Jira account email
  apiToken: string; // API token from Atlassian
}

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
