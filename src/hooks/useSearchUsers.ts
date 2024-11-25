import { useQuery } from '@tanstack/react-query';

import { searchUsers } from '@actions/users/searchUsers';

export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () =>
      searchUsers({ query, searchBy: ['firstname', 'lastname', 'email'] }),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
