import { Card, CardContent, Skeleton } from "@heroui/react";

const StartupCardSkeleton = () => (
  <Card className="h-full">
    <Skeleton className="rounded-t-xl h-40 w-full" />
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-3/4 rounded-lg" />
      <Skeleton className="h-3 w-1/2 rounded-lg" />
      <Skeleton className="h-3 w-2/3 rounded-lg" />
    </CardContent>
  </Card>
);

export default StartupCardSkeleton;