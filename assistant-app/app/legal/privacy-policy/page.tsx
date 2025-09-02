export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-gray-400">
            Last updated: September 2, 2025
          </p>
        </header>

        {/* Intro */}
        <section className="bg-surface rounded-2xl p-6 shadow">
          <p>
            Sparrow App (“we”, “our”, or “the Service”) provides a chatbot
            experience integrated with Jira via Atlassian OAuth 2.0. This
            Privacy Policy explains how we handle your data when you use our
            application.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="bg-surface rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Authentication Data: OAuth access tokens, refresh tokens, and
              related metadata.
            </li>
            <li>
              Jira Data: Project names, issue details, comments, and other
              information required for chatbot functionality.
            </li>
            <li>Chat Data: Messages you send to the chatbot for processing.</li>
            <li>
              Basic Account Information: Atlassian user ID, email address (if
              provided), and workspace URL.
            </li>
          </ul>
          <p className="italic text-sm">
            We do not collect or store your Jira password.
          </p>
        </section>

        {/* How We Use Your Information */}
        <section className="bg-surface rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            How We Use Your Information
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Authenticate your account and connect to Jira.</li>
            <li>Process your chatbot requests and return responses.</li>
            <li>Provide support and improve the service.</li>
          </ol>
          <p>
            We do not sell, rent, or share your data with third parties for
            marketing purposes.
          </p>
        </section>

        {/* Data Storage & Retention */}
        <section className="bg-surface rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            Data Storage & Retention
          </h2>
          <p>
            - OAuth tokens are securely stored and used solely to make
            authorized Jira API requests. <br />
            - Chat history may be cached temporarily for context but is not
            permanently stored unless enabled by you. <br />- Data is retained
            only as long as necessary to provide the service or as required by
            law.
          </p>
        </section>

        {/* Cookies & Session Data */}
        <section className="bg-surface rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            Cookies & Session Data
          </h2>
          <p>
            If used, cookies or session storage are only for authentication and
            session management. They do not track you across unrelated websites.
          </p>
        </section>

        {/* Security */}
        <section className="bg-surface rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            Data Security
          </h2>
          <p>
            We implement reasonable technical and organizational measures to
            protect your data against unauthorized access, loss, or disclosure.
          </p>
        </section>

        {/* Your Rights */}
        <section className="bg-surface rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            Your Rights
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Revoke the app’s access to your Atlassian account at any time via
              your Atlassian account settings.
            </li>
            <li>
              Request deletion of your data by contacting us at{" "}
              <span className="text-primary">mathieuloco@gmail.com</span>.
            </li>
          </ul>
        </section>

        {/* Third-Party Services */}
        <section className="bg-surface rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            Third-Party Services
          </h2>
          <p>
            Our application relies on Atlassian APIs and services. Use of Jira
            and Atlassian products is subject to Atlassian’s own Privacy Policy
            and Terms of Service.
          </p>
        </section>

        {/* Changes */}
        <section className="bg-surface rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Significant
            changes will be communicated via the app or email (if available).
          </p>
        </section>

        {/* Contact */}
        <section className="bg-surface rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold border-b border-border pb-2">
            Contact Us
          </h2>
          <p>
            If you have questions or concerns, please contact us at: <br />
            Mathieu Grenier <br />
            Email: <span className="text-primary">mathieuloco@gmail.com</span>
          </p>
        </section>
      </div>
    </div>
  );
}
