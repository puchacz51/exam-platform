import { isUserAssignedToTest } from '@actions/test/isUserAssignedToTest';
import { getTestAssignment } from '@actions/test/getTestAssignment';
import { TestStartCard } from '@/app/[locale]/test-attempt/start-screen/[id]/components/TestStartCard';
import { ErrorAlert } from '@/app/[locale]/test-attempt/start-screen/[id]/components/ErrorAlert';
import { redirect } from '@/i18n/routing';
import { auth } from '@/next-auth/auth';
import { setAttemptPoints } from '@actions/attempt/helpers/setAttemptPoints';

const TestStartScreen = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const accessCode = searchParams?.accessCode as string;
  const session = await auth();

  if (!session?.user?.userID) {
    return (
      <ErrorAlert
        title="Unauthorized"
        description="You must be logged in to access this test."
      />
    );
  }

  const [hasAccess, testAssignment] = await Promise.all([
    isUserAssignedToTest(params.id, accessCode),
    getTestAssignment(params.id),
  ]);

  if (!testAssignment) {
    return (
      <ErrorAlert
        title="Not Found"
        description="The requested test does not exist."
      />
    );
  }

  const attempt = testAssignment.attempts[0];

  const now = new Date();
  const startDate = attempt?.startedAt ? attempt?.startedAt : now;

  if (
    (testAssignment.timeLimit &&
      testAssignment.timeLimit * 60 * 1000 + startDate.getTime() <
        now.getTime()) ||
    (testAssignment.endsAt && new Date(testAssignment.endsAt) < now)
  ) {
    if (attempt.totalPoints === null) {
      await setAttemptPoints(attempt.id);
    }

    return (
      <ErrorAlert
        title="You exceeded the time limit"
        description="You have exceeded the time limit for this test."
      />
    );
  }

  const hasStarted = now >= startDate;
  const hasEnded =
    (testAssignment.timeLimit &&
      testAssignment.timeLimit * 60 * 1000 + startDate.getTime() <
        now.getTime()) ||
    (testAssignment.endsAt && new Date(testAssignment.endsAt) < now);

  if (hasEnded) {
    if (attempt.totalPoints === null) {
      await setAttemptPoints(attempt.id);
    }
    return (
      <ErrorAlert
        title="Test Ended"
        description="The time limit for this test has expired."
      />
    );
  }

  if (testAssignment?.attempts.length > 0) {
    redirect({
      pathname: '/test-attempt/[id]',
      params: { id: testAssignment.id },
    });
  }

  if (!hasAccess) {
    return (
      <ErrorAlert
        title="Access Denied"
        description="You do not have permission to access this test."
      />
    );
  }

  return (
    <TestStartCard
      title={testAssignment.test.title}
      description={testAssignment.test.description}
      timeLimit={testAssignment.timeLimit || -1}
      hasStarted={hasStarted}
      startDate={startDate}
      testId={params.id}
    />
  );
};

export default TestStartScreen;
