import { getAssignmentWithTest } from '@actions/test/getAssignmentWithTest';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

import {
  AttemptQuestionGroup,
  TestAttemptContent,
} from './components/TestAttemptContent';

interface PageProps {
  params: {
    id: string;
  };
}

const TestAttemptPage = async ({ params }: PageProps) => {
  const assignment = await getAssignmentWithTest(params.id);
  const { questionGroups, attempts } = assignment;

  return (
    <ReactQueryProvider>
      <TestAttemptContent
        attemptId={attempts[0].id}
        testAssignmentId={params.id}
        questionGroups={questionGroups as AttemptQuestionGroup[]}
      />
    </ReactQueryProvider>
  );
};

export default TestAttemptPage;
