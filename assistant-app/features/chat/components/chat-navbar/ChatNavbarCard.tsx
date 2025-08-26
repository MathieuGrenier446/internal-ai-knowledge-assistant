import { useChatUIStore } from "@/features/chat/hooks/useChatUI";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Chat } from "@prisma/client";
import { cva } from "cva";

type ChatNavbarCardProps = {
  chat?: Chat;
};

const stateIndicator = cva(["p-2", "rounded-full", "h-fit"], {
  variants: {
    state: {
      VALID: ["bg-success"],
      ERROR: ["bg-danger"],
      WARNING: ["bg-warning"],
    },
  },
  defaultVariants: {
    state: "ERROR",
  },
});

export function ChatNavbarCard(props: ChatNavbarCardProps) {
  const handleClick = () => {
    useChatUIStore((state) => {
      if (props.chat) state.setActiveChat(props.chat.id);
    });
  };

  return (
    <Card onClick={handleClick}>
      <CardBody>
        <div className="flex gap-2 items-center">
          <span
            className={cn(stateIndicator({ state: props.chat?.state }))}
          ></span>
          <p className="truncate">{props.chat?.title || "New Chat"}</p>
        </div>
      </CardBody>
    </Card>
  );
}
