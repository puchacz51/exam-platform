import { useQuery } from '@tanstack/react-query';

import { getUserTeamsGroups } from '@actions/groups/teamsGroup';

export const useTeamsGroups = (enabled: boolean) => {
  return useQuery({
    queryKey: ['teamsGroups'],
    queryFn: () => getUserTeamsGroups(),
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
  });
};
