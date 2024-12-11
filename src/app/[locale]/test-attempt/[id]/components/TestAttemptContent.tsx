'use client';

import { FC } from 'react';

import { useParams } from 'next/navigation';

import TestAttemptGroups from '@/app/[locale]/test-attempt/[id]/components/TestAttemptGroups';
import { useGetAssignmentWithTestQuery } from '@/hooks/useGetAssignmentWithTest';
import { UserAttemptFlowResponse } from '@actions/attempt/getUsetAttemptFlow';
import { Alert } from '@/components/ui/alert';
import TestAttemptQuestion from '@/app/[locale]/test-attempt/[id]/components/TestAttemptQuestion';

interface TestAttemptContentProps {
  assignmentWithTest: UserAttemptFlowResponse['data'];
}

export const TestAttemptContent: FC<TestAttemptContentProps> = ({
  assignmentWithTest,
}) => {
  const params = useParams();
  const testAssignmentId = params.id as string;
  const { data } = useGetAssignmentWithTestQuery(
    {
      assignmentId: testAssignmentId,
    },
    { initialData: assignmentWithTest }
  );

  if (!data) {
    return <Alert>Failed to load test assignment</Alert>;
  }
  if (data.type == 'QUESTION') {
    return (
      <TestAttemptQuestion
        key={data.currentQuestionId}
        userAttemptFlow={data}
      />
    );
  }

  return (
    <TestAttemptGroups
      key={data.currentGroupId}
      userAttemptFlow={data}
    />
  );
};
