import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        <div className="space-y-4">
          <Skeleton className="mx-auto h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div>
                <Skeleton className="mx-auto mb-6 h-7 w-32" />
                <div className="grid gap-6 sm:grid-cols-3">
                  <Skeleton className="h-28" />
                  <Skeleton className="h-28" />
                  <Skeleton className="h-28" />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t p-8">
            <Skeleton className="h-10 w-36" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
