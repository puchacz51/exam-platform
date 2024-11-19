'use client';

import { useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GroupCard from '@/app/[locale]/(dashboard)/groups/components/GroupCard';

interface Group {
  id: string;
  displayName: string;
  description?: string;
}

interface GroupListProps {
  groups: Group[];
}

const GroupList = ({ groups }: GroupListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredGroups = groups.filter((group) =>
    group.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedGroups = filteredGroups.slice(0, limit);
  const hasMore = filteredGroups.length > displayedGroups.length;

  const loadMore = () => {
    setLimit(groups.length);
  };

  return (
    <div>
      <Input
        type="search"
        placeholder="Search groups..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
      />
      <div className="space-y-4">
        {filteredGroups.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              {searchQuery
                ? 'No groups found matching your search'
                : 'No groups available'}
            </p>
          </div>
        ) : (
          <>
            <div
              ref={listRef}
              className="divide-y divide-gray-200 overflow-y-auto rounded-lg border"
              style={{
                maxHeight: displayedGroups.length > 8 ? '600px' : 'auto',
              }}
            >
              {displayedGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  {...group}
                />
              ))}
            </div>
            {hasMore && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  className="w-full sm:w-auto"
                >
                  Show All
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupList;
