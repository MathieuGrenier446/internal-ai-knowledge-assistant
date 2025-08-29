import { Card, CardBody, Skeleton } from "@heroui/react";

export default function ChatNavbarCardSkeleton() {
  return (
    <Card>
      <CardBody>
        <div className="flex gap-2 items-center">
          <Skeleton className="rounded-full p-2 h-fit" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-2 w-3/5 rounded-lg" />
            <Skeleton className="h-2 w-4/5 rounded-lg" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
