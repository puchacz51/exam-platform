import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';

import { UserAttemptFlowResponse } from '@actions/attempt/getUsetAttemptFlow';

const GetAssignedAccess = async (
  assignmentId: string,
  { groupId, questionId }: { groupId?: string; questionId?: string } = {}
) => {
  const response = await fetch(
    `/api/test-attempts/${assignmentId}/flow?${new URLSearchParams({
      ...(groupId && { groupId }),
      ...(questionId && { questionId }),
    })}`
  );

  return response.json() as unknown as UserAttemptFlowResponse;
};

export const useGetAssignmentWithTestQuery = (
  options?: Omit<
    UseQueryOptions<UserAttemptFlowResponse['data']>,
    'queryKey' | 'queryFn'
  >
) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const assignmentId = params.id as string;
  const groupId = (searchParams.get('groupId') || '') as string;
  const questionId = (searchParams.get('questionId') || '') as string;
  const navOptions =
    (!!groupId && { groupId }) || (!!questionId && { questionId }) || undefined;

  const session = useSession();
  const userId = session?.data?.user.userID || '';

  return useQuery<UserAttemptFlowResponse['data']>({
    ...options,
    enabled: false,
    queryFn: async () => {
      const response = await GetAssignedAccess(assignmentId, navOptions);
      if (response.error) {
        throw new Error(response.error);
      }

      return response.data;
    },
    queryKey: ['assignmentWithTest', userId, assignmentId],
  });
};
