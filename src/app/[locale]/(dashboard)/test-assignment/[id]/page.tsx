import { NextPage } from 'next';

import TestAssignmentAttemptList from '@/app/[locale]/(dashboard)/test-assignment/[id]/components/TestAssignmentAttemptList';
import {
  getTestAttempts,
} from '@actions/attempt/getTestAttempts';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TestAccessAttemptsPageProps {
  params: {
    id: string;
  };
}

const TestAccessAttemptsPage: NextPage<TestAccessAttemptsPageProps> = async ({
  params,
}) => {
  const testAttempts = await getTestAttempts(params.id, 1, 10);

  return (
    <div>
      TestAccessAttemptsPage
      <TestAssignmentAttemptList initialData={testAttempts} />
    </div>
  );
};

export default TestAccessAttemptsPage;
