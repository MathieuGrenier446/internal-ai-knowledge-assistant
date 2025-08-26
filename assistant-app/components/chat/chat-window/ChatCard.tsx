import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Message } from "@/types/chat";
import { cva } from "cva";
import { cn } from "@/lib/utils";

type ChatCardProps = {
  message: Message;
};

const messageBubble = cva(["p-3 rounded-md max-w-[400px]"], {
  variants: {
    sender: {
      assistant: ["bg-secondary text-black self-center"],
      user: ["bg-primary text-white self-end"],
    },
  },
  defaultVariants: {
    sender: "assistant",
  },
});

export function ChatCard(props: ChatCardProps) {
  const isAssistant = props.message.sender === "assistant";
  return (
    <div>
      {isAssistant ? (
        <div></div>
      ) : (
        <Card className={cn(messageBubble({ sender: props.message.sender }))}>
          <CardBody>
            <p>{props.message.content}</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
