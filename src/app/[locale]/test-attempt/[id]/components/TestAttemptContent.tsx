'use client';

import { FC, useEffect } from 'react';

import { useParams } from 'next/navigation';

import TestAttemptGroups from '@/app/[locale]/test-attempt/[id]/components/TestAttemptGroups';
import { useGetAssignmentWithTestQuery } from '@/hooks/useGetAssignmentWithTest';
import { UserAttemptFlowResponse } from '@actions/attempt/getUsetAttemptFlow';
import { Alert } from '@/components/ui/alert';
import TestAttemptQuestion from '@/app/[locale]/test-attempt/[id]/components/TestAttemptQuestion';
import TestAttemptHeader from '@/app/[locale]/test-attempt/[id]/components/TestAttemptHeader';

interface TestAttemptContentProps {
  assignmentWithTest: UserAttemptFlowResponse['data'];
}

export const TestAttemptContent: FC<TestAttemptContentProps> = ({
  assignmentWithTest,
}) => {
  const params = useParams();

  const { data, refetch } = useGetAssignmentWithTestQuery({
    initialData: assignmentWithTest,
  });

  console.log(data);

  useEffect(() => {
    refetch();
  }, [params]);

  if (!data) {
    return <Alert>Failed to load test assignment</Alert>;
  }

  return (
    <>
      <main className="container">
        <TestAttemptHeader attemptData={data} />
        {data.type === 'QUESTION' ? (
          <TestAttemptQuestion
            key={data.currentQuestionId}
            userAttemptFlow={data}
          />
        ) : (
          <TestAttemptGroups
            key={data.currentGroupId}
            userAttemptFlow={data}
          />
        )}
      </main>
    </>
  );
};
