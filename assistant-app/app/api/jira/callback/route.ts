import {
  JIRA_CLIENT_ID,
  JIRA_CLIENT_SECRET,
  JIRA_REDIRECT_URL,
} from "@/lib/jira/constants";
import { setJiraAuthToken, setJiraCloudId } from "@/lib/jira/jira-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 },
    );
  }

  const response = await fetch("https://auth.atlassian.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: JIRA_CLIENT_ID,
      client_secret: JIRA_CLIENT_SECRET,
      code,
      redirect_uri: JIRA_REDIRECT_URL,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: 500 });
  }

  const res = NextResponse.redirect(new URL("/jira/success", req.url));
  await setJiraAuthToken(data.access_token, data.expires_in);
  await setJiraCloudId();

  return res;
}
