import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { TestAttemptContent } from '@/app/[locale]/test-attempt/[id]/components/TestAttemptContent';
import { getUserAttemptFlow } from '@actions/attempt/getUsetAttemptFlow';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
}

const TestAttemptPage = async ({ params, searchParams }: PageProps) => {
  const groupId =
    typeof searchParams.groupId === 'string' ? searchParams.groupId : undefined;
  const questionId =
    typeof searchParams.questionId === 'string'
      ? searchParams.questionId
      : undefined;
  const navOptions =
    questionId || groupId ? { groupId, questionId } : undefined;

  const test = await getUserAttemptFlow(
    params.id,
    navOptions as unknown as undefined
  );

  return (
    <ReactQueryProvider>
      <TestAttemptContent assignmentWithTest={test.data} />
    </ReactQueryProvider>
  );
};

export default TestAttemptPage;
