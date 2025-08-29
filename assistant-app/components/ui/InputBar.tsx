import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { useState } from "react";

type InputBarProps = {
  placeholder?: string;
  onSubmit: (value: string) => void;
  disabled: boolean;
};

export default function InputBar(props: InputBarProps) {
  const [chatInput, setChatInput] = useState("");
  const handleSend = () => {
    props.onSubmit(chatInput);
    setChatInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-fit w-xl justify-between items-center rounded-4xl text-foreground bg-surface px-2">
      <Textarea
        className="px-4 pb-2"
        variant="underlined"
        minRows={1}
        maxRows={8}
        placeholder={props.placeholder}
        value={chatInput}
        onValueChange={(value) => setChatInput(value)}
        onKeyDown={handleKeyDown}
        isDisabled={props.disabled}
      ></Textarea>
      <div className="py-2 self-end">
        <Button
          variant="ghost"
          isIconOnly={true}
          radius="full"
          onPress={handleSend}
          isDisabled={props.disabled}
        >
          <ArrowUpIcon className="size-6" />
        </Button>
      </div>
    </div>
  );
}
