import { isUserAssignedToTest } from '@actions/test/isUserAssignedToTest';
import { getTestAssignment } from '@actions/test/getTestAssignment';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Timer, Files, Calendar } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default async function TestStartScreen({
  params,
}: {
  params: { id: string };
}) {
  const hasAccess = await isUserAssignedToTest(params.id);
  if (!hasAccess) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access this test.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const testAssignment = await getTestAssignment(params.id);
  if (!testAssignment) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Not Found</AlertTitle>
            <AlertDescription>
              The requested test does not exist.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const now = new Date();
  const startDate = testAssignment.startsAt
    ? new Date(testAssignment.startsAt)
    : null;
  const hasStarted = startDate ? now >= startDate : true;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4 border-b pb-6">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold tracking-tight">
                {testAssignment.test.title}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {testAssignment.test.description}
              </CardDescription>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              {testAssignment.timeLimit && (
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span>Time limit: {testAssignment.timeLimit} minutes</span>
                </div>
              )}
              {testAssignment.maxAttempts && (
                <div className="flex items-center gap-2">
                  <Files className="h-4 w-4" />
                  <span>Max attempts: {testAssignment.maxAttempts}</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {hasStarted ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-green-700">
                    The test is now available. Good luck!
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  <Link
                    href={{
                      pathname: '/test-attempt/[id]',
                      params: { id: params.id },
                    }}
                  >
                    Start Test
                  </Link>
                </Button>
              </div>
            ) : (
              <Alert className="border-2">
                <Calendar className="h-4 w-4" />
                <AlertTitle className="font-semibold">
                  Test Not Started
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="font-medium">
                    Scheduled start: {startDate?.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Please come back at the scheduled time to begin the test.
                  </p>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
