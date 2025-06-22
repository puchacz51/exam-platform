import { useQuery } from '@tanstack/react-query';

import { getAttemptDetails } from '@actions/attempt/getAttemptDetails';

export const useGetAttemptDetails = (attemptId: string | null) => {
  return useQuery({
    queryKey: ['attempt-details', attemptId],
    queryFn: () => (attemptId ? getAttemptDetails(attemptId) : null),
    enabled: !!attemptId,
  });
};
