import { getAssignmentWithTest } from '@actions/test/getAssignmentWithTest';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { TestAttemptContent } from '@/app/[locale]/test-attempt/[id]/components/TestAttemptContent';
// import { getUserAttemptFlow } from '@actions/attempt/getUsetAttemptFlow';

interface PageProps {
  params: {
    id: string;
  };
}

const TestAttemptPage = async ({ params }: PageProps) => {
  const assignment = await getAssignmentWithTest(params.id);
  // const test = await getUserAttemptFlow(params.id, {
  //   groupId: '361f37e4-1712-46e2-8cd3-a6a5e2a7d2a0',
  // });
  // const testAttempt = test?.data;
  // const type = testAttempt?.type;

  console.log(test?.data?.questionsGroups);
  return (
    <ReactQueryProvider>
      <TestAttemptContent assignmentWithTest={assignment} />
    </ReactQueryProvider>
  );
};

export default TestAttemptPage;
