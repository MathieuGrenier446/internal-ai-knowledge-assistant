import {ArrowUpIcon} from '@heroicons/react/24/outline'
import { Button } from "@heroui/button";
import {Textarea} from "@heroui/input";

type InputBarProps = {
    placeholder: string,
}

export default function InputBar(props: InputBarProps){
    return (
        <div className="flex h-fit w-full justify-between items-center rounded-4xl text-foreground bg-surface px-2">
            <Textarea className='px-4 pb-2' variant="underlined" minRows={1} maxRows={8} placeholder={props.placeholder}>
            </Textarea>
            <div className='py-4 self-end'>
                <Button variant='ghost' isIconOnly={true} radius='full'>
                    <ArrowUpIcon className="size-6" />
                </Button>
            </div>
            
        </div>
    )
}