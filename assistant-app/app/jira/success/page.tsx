"use client";
import { useEffect } from "react";

export default function JiraSuccessPage() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: "jira-auth-success" }, "*");
      window.close();
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-600">
        Authentication successful. You can close this window.
      </p>
    </div>
  );
}
