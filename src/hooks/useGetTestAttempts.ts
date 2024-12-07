import { QueryOptions, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { TestAttemptsResponse } from '@actions/attempt/getTestAttempts';

interface UseGetTestAttemptsParams {
  testAccessId: string;
  page?: number;
  limit?: number;
  options?: QueryOptions<TestAttemptsResponse>;
}

const fetchTestAttempts = async (
  testAccessId: string,
  page: number,
  limit: number
): Promise<TestAttemptsResponse> => {
  const response = await fetch(
    `/api/test-attempts?testAccessId=${testAccessId}&page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch test attempts');
  }

  return response.json();
};

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
    queryFn: () => fetchTestAttempts(testAccessId, page, limit),
    enabled: !!testAccessId && !!userId,
    ...options,
  });
};
