import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import {
  AssignmentWithTest,
  getAssignmentWithTest,
} from '@actions/test/getAssignmentWithTest';

export const useGetAssignmentWithTestQuery = (
  assignmentId: string,
  options?: Omit<UseQueryOptions<AssignmentWithTest>, 'queryKey' | 'queryFn'>
) => {
  const session = useSession();
  const userId = session?.data?.user.userID || '';
  return useQuery<AssignmentWithTest>({
    ...options,
    enabled: false,
    queryFn: async () => {
      return getAssignmentWithTest(assignmentId);
    },
    queryKey: ['assignmentWithTest', userId, assignmentId],
  });
};
