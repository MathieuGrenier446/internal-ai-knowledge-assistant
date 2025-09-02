import { NextResponse } from "next/server";
import { createJiraClient } from "@/lib/jira/jira-requests";

export async function GET() {
  const jiraClient = await createJiraClient();

  const projects = await jiraClient.getProjects();
  return NextResponse.json(projects);
}
