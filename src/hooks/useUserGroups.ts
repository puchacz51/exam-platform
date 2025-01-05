import { useQuery } from '@tanstack/react-query';

import { getUserGroups, UserGroups } from '@actions/groups/getGroup';


export function useUserGroups(initialGroups?: NonNullable<UserGroups['data']>) {
  return useQuery<NonNullable<UserGroups['data']>>({
    queryKey: ['userGroups'],
    queryFn: () =>
      getUserGroups().then((response) => {
        if (response.success) {
          return response.data as NonNullable<UserGroups['data']>;
        }
        throw new Error(response.error);
      }),
    initialData: initialGroups,
  });
}
