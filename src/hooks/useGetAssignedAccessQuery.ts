import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { usePagination } from '@/hooks/navigation/usePagination';
import { BasicUserTestAssignmentsResponse } from '@actions/test-assigment/getBasicUserTestAssignments';

const GetAssignedAccess = async (page: string) => {
  const response = await fetch(
    `/api/test-access/assigned?${new URLSearchParams({
      page,
    })}`,
    {
      headers: {},
    }
  );

  return response.json() as unknown as BasicUserTestAssignmentsResponse;
};

type UseGetAssignedAccessQueryOptions = Omit<
  UseQueryOptions<BasicUserTestAssignmentsResponse>,
  'queryKey'
>;

export const useGetAssignedAccessQuery = (
  options?: UseGetAssignedAccessQueryOptions
) => {
  const { data } = useSession();
  const userId = data?.user?.userID;
  const { currentPage } = usePagination({});

  return useQuery<BasicUserTestAssignmentsResponse>({
    ...options,
    queryKey: ['assigned-access', userId, currentPage],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) {
        throw new Error('Unauthorized');
      }

      const result = GetAssignedAccess(currentPage.toString());
      return result;
    },
  });
};
