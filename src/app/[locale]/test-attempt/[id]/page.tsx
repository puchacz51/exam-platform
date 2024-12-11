import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { TestAttemptContent } from '@/app/[locale]/test-attempt/[id]/components/TestAttemptContent';
import { getUserAttemptFlow } from '@actions/attempt/getUsetAttemptFlow';

interface PageProps {
  params: {
    id: string;
  };
}

const TestAttemptPage = async ({ params }: PageProps) => {
  const test = await getUserAttemptFlow(params.id);
  console.log(test,'233232');

  return (
    <ReactQueryProvider>
      <TestAttemptContent assignmentWithTest={test.data} />
    </ReactQueryProvider>
  );
};

export default TestAttemptPage;
