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

  if (testAssignment.attempts.length > 0) {
    redirect({
      pathname: '/test-attempt/[id]',
      params: { id: testAssignment.id },
    });
  }

  const now = new Date();
  const startDate = testAssignment.startsAt
    ? new Date(testAssignment.startsAt)
    : now;

  if (testAssignment.timeLimit && testAssignment.timeLimit < 1) {
    return (
      <ErrorAlert
        title="Invalid Test Configuration"
        description="Time limit must be at least 1 minute."
      />
    );
  }

  const endDate = testAssignment.endsAt
    ? new Date(testAssignment.endsAt)
    : null;

  const hasStarted = now >= startDate;
  const hasEnded = endDate ? now >= endDate : false;

  if (hasEnded) {
    return (
      <ErrorAlert
        title="Test Ended"
        description="The time limit for this test has expired."
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
