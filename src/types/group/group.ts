export interface GroupMember {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface Group {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  isOwner: boolean;
  memberCount: {
    value: number;
  };
}

export interface GroupsResponse {
  success: boolean;
  data: Group[];
  totalCount: number;
  error?: string;
}

export interface GroupMembersResponse {
  success: boolean;
  data: GroupMember[];
  error?: string;
}
