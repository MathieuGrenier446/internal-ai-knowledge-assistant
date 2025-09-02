import { cookies } from "next/headers";
import { JiraAuthConfig } from "./types";
import { JIRA_BASE_DOMAIN_3LO } from "./constants";

export async function getJiraConfig(): Promise<JiraAuthConfig> {
  const cookieStore = await cookies();
  const token = cookieStore.get("jira_access_token")?.value;
  const cloudId = cookieStore.get("jira_cloud_id")?.value;

  if (!token || !cloudId || !JIRA_BASE_DOMAIN_3LO)
    throw new Error("Missing Jira config");

  return { domain: JIRA_BASE_DOMAIN_3LO, accessToken: token, cloudId };
}
