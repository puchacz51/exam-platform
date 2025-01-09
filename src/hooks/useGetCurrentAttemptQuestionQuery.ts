'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import {
  AssignmentWithTest,
  getAssignmentWithTest,
} from '@actions/test/getAssignmentWithTest';

export const useGetCurrentAttemptQuestionQuery = (assignmentId: string) => {
  const session = useSession();

  const { data, error } = useQuery<AssignmentWithTest>({
    queryKey: ['currentAttemptQuestion', session?.data?.user.userID],
    queryFn: async () => await getAssignmentWithTest(assignmentId),
    enabled: false,
  });

  return { data, error };
};
