import { useQuery } from '@tanstack/react-query';

import { getUserGroups } from '@actions/groups/getGroup';

interface Group {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  memberCount: { value: number };
}

export function useUserGroups(initialGroups?: Group[]) {
  return useQuery<Group[]>({
    queryKey: ['userGroups'],
    queryFn: () =>
      getUserGroups().then((response) => {
        if (response.success) {
          return response.data as Group[];
        }
        throw new Error(response.error);
      }),
    initialData: initialGroups,
  });
}
