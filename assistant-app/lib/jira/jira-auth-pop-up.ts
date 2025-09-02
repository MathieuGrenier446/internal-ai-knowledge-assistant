export function openJiraOAuthWindow() {
  const width = 600;
  const height = 700;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const url = "/api/jira/auth"; // proxy route that redirects to Jira OAuth URL
  window.open(
    url,
    "jira-oauth",
    `width=${width},height=${height},left=${left},top=${top}`,
  );
}
