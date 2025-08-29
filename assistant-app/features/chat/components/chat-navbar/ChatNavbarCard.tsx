import { useChatUIStore } from "@/features/chat/hooks/useChatUI";
import { cn } from "@/lib/utils";
import { Card, CardBody } from "@heroui/card";
import { Chat } from "@prisma/client";
import { cva } from "cva";
import ChatNavbarCardSkeleton from "./ChatNavbarCardSkeleton";

type ChatNavbarCardProps = {
  chat?: Chat;
  isLoading?: boolean;
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

const activeIndicator = cva([], {
  variants: {
    isActive: {
      true: ["bg-surface"],
      false: [""],
    },
  },
});

export function ChatNavbarCard(props: ChatNavbarCardProps) {
  const setActiveChat = useChatUIStore((state) => state.setActiveChat);
  const isActive =
    useChatUIStore((state) => state.activeChatId) === props.chat?.id ||
    props.chat === undefined;

  const handleClick = () => {
    if (props.chat) {
      setActiveChat(props.chat.id);
    }
  };

  if (props.isLoading) {
    return <ChatNavbarCardSkeleton />;
  }

  return (
    <Card
      isPressable
      onClick={handleClick}
      className={cn(activeIndicator({ isActive }))}
    >
      <CardBody>
        <div className="flex gap-2 items-center">
          <span
            className={cn(stateIndicator({ state: props.chat?.state }))}
          ></span>
          <p className="text-ellipsis truncate">
            {props.chat?.title || "New Chat"}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
