import { Card, CardBody } from "@heroui/card";
import { ChatCardProps } from "./types";

export function ChatUserCard(props: ChatCardProps) {
  return (
    <Card className="bg-primary px-2 rounded-4xl max-w-[400px] text-white self-end">
      <CardBody>
        <p>{props.message.content}</p>
      </CardBody>
    </Card>
  );
}
