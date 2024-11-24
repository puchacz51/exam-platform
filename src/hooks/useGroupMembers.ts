import { useQuery } from '@tanstack/react-query';

import { getGroupMembers } from '@actions/groups/getGroup';

export const useGroupMembers = (groupId: string, enabled = true) => {
  return useQuery({
    queryKey: ['group-members', groupId],
    queryFn: () => getGroupMembers(groupId),
    enabled,
    select: (response) => response.data,
  });
};
