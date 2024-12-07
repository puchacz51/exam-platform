import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getTestOwnerAssignments } from '@actions/test-assigment/getTestOwnerAssignments';
import { usePagination } from '@/hooks/navigation/usePagination';

export const useOwnedAccessQuery = () => {
  const session = useSession();
  const userId = session?.data?.user?.userID;
  const { currentPage } = usePagination({});

  return useQuery({
    queryKey: ['owned-access', userId, currentPage],
    queryFn: async () => {
      const result = await getTestOwnerAssignments();
      return result;
    },
  });
};
