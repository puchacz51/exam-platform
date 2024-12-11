import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import {
  getUserAttemptFlow,
  UserAttemptFlowResponse,
} from '@actions/attempt/getUsetAttemptFlow';

import { NavOptions } from '../../types/attempt';

export const useGetAssignmentWithTestQuery = (
  {
    assignmentId,
    navOptions,
  }: { assignmentId: string; navOptions?: NavOptions },
  options?: Omit<
    UseQueryOptions<UserAttemptFlowResponse['data']>,
    'queryKey' | 'queryFn'
  >
) => {
  const session = useSession();
  const userId = session?.data?.user.userID || '';
  return useQuery<UserAttemptFlowResponse['data']>({
    ...options,
    enabled: false,
    queryFn: async () => {
      const response = await getUserAttemptFlow(assignmentId, navOptions);

      if (response.error) {
        throw new Error(response.error);
      }

      return response.data;
    },
    queryKey: ['assignmentWithTest', userId, assignmentId],
  });
};
