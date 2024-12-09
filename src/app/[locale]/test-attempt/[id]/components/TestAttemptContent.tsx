'use client';

import { FC } from 'react';

import { AssignmentWithTest } from '@actions/test/getAssignmentWithTest';
import TestAttemptGroups from '@/app/[locale]/test-attempt/[id]/components/TestAttemptGroups';
import { useGetAssignmentWithTestQuery } from '@/hooks/useGetAssignmentWithTest';

interface TestAttemptContentProps {
  assignmentWithTest: AssignmentWithTest;
}

export const TestAttemptContent: FC<TestAttemptContentProps> = ({
  assignmentWithTest,
}) => {
  const { data } = useGetAssignmentWithTestQuery(assignmentWithTest.id, {
    initialData: assignmentWithTest,
  });

  if (!data) {
    return null;
  }

  return <TestAttemptGroups testAssignmentWithTest={data} />;
};
