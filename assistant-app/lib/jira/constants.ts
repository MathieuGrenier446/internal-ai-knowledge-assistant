export const JIRA_CLIENT_ID = process.env.JIRA_CLIENT_ID!;
export const JIRA_CLIENT_SECRET = process.env.JIRA_CLIENT_SECRET!;
export const JIRA_REDIRECT_URL = process.env.JIRA_REDIRECT_URL!;

export const JIRA_BASE_DOMAIN_3LO = "api.atlassian.com/ex/jira";

export const JIRA_PERMISSIONS = ["read:jira-work", "read:jira-user"].join(" ");
