import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 },
    );
  }

  const clientId = process.env.JIRA_CLIENT_ID!;
  const clientSecret = process.env.JIRA_CLIENT_SECRET!;
  const redirectUrl = process.env.JIRA_REDIRECT_URL!;

  const response = await fetch("https://auth.atlassian.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUrl,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: 500 });
  }

  const res = NextResponse.redirect(new URL("/jira/success", req.url)); // redirect user somewhere safe
  res.cookies.set("jira_access_token", data.access_token, {
    httpOnly: true, // client-side JS can't read it
    secure: true, // only sent over HTTPS
    sameSite: "lax", // prevent CSRF
    path: "/", // available across the site
    maxAge: data.expires_in, // match token expiry
  });

  return res;
}
