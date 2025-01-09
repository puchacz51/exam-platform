import { UserGroups } from '@actions/groups/getGroup';

export interface GroupMember {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface GroupsResponse {
  success: boolean;
  data: NonNullable<UserGroups['data']>;
  totalCount: number;
  error?: string;
}

export interface GroupMembersResponse {
  success: boolean;
  data: GroupMember[];
  error?: string;
}
