import { cn } from "@/lib/utils";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { cva } from "cva";

type ChatNavbarCardProps = {
    title: string,
    state: "valid" | "error" | "warning",
}

const stateIndicator = cva(["p-2", "rounded-full", "h-fit"], {
    variants: {
        state: {
            valid: ["bg-success"],
            error: ["bg-danger"],
            warning: ["bg-warning"]
        },       
    },
    defaultVariants: {
        state: "error"
    }
    }
)

export function ChatNavbarCard(props: ChatNavbarCardProps){ 
    return (
        <Card>
            <CardBody>
                <div className="flex gap-2 items-center">
                    <span className={cn(stateIndicator({ state: props.state }))}></span>
                    <p className="truncate">{props.title}</p>
                </div>
            </CardBody>
        </Card>
    )
}