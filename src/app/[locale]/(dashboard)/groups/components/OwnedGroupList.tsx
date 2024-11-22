'use client';

import { Users } from 'lucide-react';

import { useUserGroups } from '@/hooks/useUserGroups';

import { GroupItem } from './GroupItem';

interface Group {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  memberCount: { value: number };
}

interface OwnedGroupListProps {
  initialGroups: Group[];
}

const OwnedGroupList = ({ initialGroups }: OwnedGroupListProps) => {
  const { data: groups } = useUserGroups(initialGroups);

  if (!groups?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <Users
          size={48}
          className="mb-4 text-gray-400"
        />
        <p className="text-lg font-medium">No groups found</p>
        <p className="text-sm">Create a new group to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <GroupItem
          key={group.id}
          group={group}
        />
      ))}
    </div>
  );
};

export default OwnedGroupList;
