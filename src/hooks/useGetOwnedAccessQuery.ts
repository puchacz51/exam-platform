import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { usePagination } from '@/hooks/navigation/usePagination';
import { TestOwnerAssignment } from '@actions/test-assigment/getTestOwnerAssignments';

const getTestOwnerAssignments = async (page: number) => {
  const response = await fetch(`/api/test-access/owned?page=${page}`);

  return response.json() as unknown as TestOwnerAssignment;
};

export const useOwnedAccessQuery = () => {
  const { data } = useSession();
  const userId = data?.user?.userID;
  const { currentPage } = usePagination({});

  return useQuery({
    queryKey: ['owned-access', userId, currentPage],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) {
        throw new Error('Unauthorized');
      }

      const result = getTestOwnerAssignments(currentPage);
      return result;
    },
  });
};
