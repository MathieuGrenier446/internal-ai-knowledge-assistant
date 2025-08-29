import { getJiraOAuthURL } from "@/services/jira/jira-auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";

export async function GET() {
  let sessionId = (await cookies()).get("sessionId")?.value;

  if (sessionId === undefined) {
    (await cookies()).set("sessionId", uuid(), {
      httpOnly: true, // Recommended for security, prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Use secure in production for HTTPS
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      path: "/", // Cookie accessible across the entire domain
      sameSite: "lax", // Or 'strict', 'none' depending on your requirements
    });
    sessionId = (await cookies()).get("sessionId")?.value;
    if (sessionId === undefined) return NextResponse.error();
  }

  const jiraOAuthURL = getJiraOAuthURL(sessionId);

  return NextResponse.redirect(jiraOAuthURL, { status: 302 });
}
