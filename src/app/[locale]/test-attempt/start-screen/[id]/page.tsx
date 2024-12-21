import { isUserAssignedToTest } from '@actions/test/isUserAssignedToTest';
import { getTestAssignment } from '@actions/test/getTestAssignment';
import { TestStartCard } from '@/app/[locale]/test-attempt/start-screen/[id]/components/TestStartCard';
import { ErrorAlert } from '@/app/[locale]/test-attempt/start-screen/[id]/components/ErrorAlert';
import { redirect } from '@/i18n/routing';

const TestStartScreen = async ({ params }: { params: { id: string } }) => {
  const hasAccess = await isUserAssignedToTest(params.id);

  if (!hasAccess) {
    return (
      <ErrorAlert
        title="Access Denied"
        description="You do not have permission to access this test."
      />
    );
  }

  const testAssignment = await getTestAssignment(params.id);

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
