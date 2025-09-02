import { generateSessionId, getJiraOAuthURL } from "@/lib/jira/jira-auth";
import { NextResponse } from "next/server";
import { JIRA_CLIENT_ID } from "@/lib/jira/constants";

export async function GET() {
  const sessionId = await generateSessionId();

  const jiraOAuthURL = getJiraOAuthURL(sessionId, JIRA_CLIENT_ID);

  return NextResponse.redirect(jiraOAuthURL, { status: 302 });
}
