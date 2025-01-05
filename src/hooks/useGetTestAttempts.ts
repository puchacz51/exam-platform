import { QueryOptions, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import {
  getTestAttempts,
  TestAttemptsResponse,
} from '@actions/attempt/getTestAttempts';

interface UseGetTestAttemptsParams {
  testAccessId: string;
  page?: number;
  limit?: number;
  options?: QueryOptions<TestAttemptsResponse>;
}

export const useGetTestAttempts = ({
  testAccessId,
  page = 1,
  limit = 10,
  options = {},
}: UseGetTestAttemptsParams) => {
  const session = useSession();
  const userId = session?.data?.user.userID;

  return useQuery<TestAttemptsResponse>({
    queryKey: ['testAttempts', testAccessId, page, limit, userId],
    queryFn: async () => await getTestAttempts(testAccessId, page, limit),
    enabled: false,
    ...options,
  });
};
