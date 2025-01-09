import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getAllUserTests, OwnedTestResponse } from '@actions/test/getAllTests';

interface UseTestsProps {
  page?: number;
  limit?: number;
}

export const useTests = ({ limit = 50, page = 1 }: UseTestsProps = {}) => {
  const { data: session } = useSession();

  return useQuery<OwnedTestResponse>({
    queryKey: ['ownedTest', session?.user?.userID],
    queryFn: async () => {
      const result = await getAllUserTests(page, limit);
      if (!result) throw new Error('No data returned');
      return result;
    },
    enabled: !!session?.user?.userID,
  });
};
