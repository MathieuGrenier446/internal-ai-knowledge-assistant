export function ChatAssistantCard({ content }: { content: string }) {
  return (
    <div className="self-center max-w-2xl py-8">
      <p>{content}</p>
    </div>
  );
}
