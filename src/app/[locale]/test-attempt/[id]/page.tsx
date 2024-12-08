import { getAssignmentWithTest } from '@actions/test/getAssignmentWithTest';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { TestAttemptContent } from '@/app/[locale]/test-attempt/[id]/components/TestAttemptContent';

interface PageProps {
  params: {
    id: string;
  };
}

const TestAttemptPage = async ({ params }: PageProps) => {
  const assignment = await getAssignmentWithTest(params.id);

  return (
    <ReactQueryProvider>
      <TestAttemptContent assignmentWithTest={assignment} />
    </ReactQueryProvider>
  );
};

export default TestAttemptPage;
