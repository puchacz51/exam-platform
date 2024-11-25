import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getAllUserTests } from '@actions/test/getAllTests';
import { CompleteTest } from '@/types/test/test';

export const useTests = () => {
  const { data: session } = useSession();

  return useQuery<CompleteTest[]>({
    queryKey: ['tests', session?.user?.userID],
    queryFn: async () => {
      const result = await getAllUserTests();
      if (!result) throw new Error('No data returned');
      return result;
    },
    enabled: !!session?.user?.userID,
  });
};
