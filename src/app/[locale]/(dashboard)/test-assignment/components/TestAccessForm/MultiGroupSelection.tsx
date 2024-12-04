import { useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { Check, Eye, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Group } from '@/types/group/group';
import { Button } from '@/components/ui/button';

import { ViewMembersModal } from './ViewMembersModal';
import { TestAccessFormValues } from '../../schema/TestAccessSchema';

interface MultiGroupSelectionProps {
  initialGroups: Group[];
}

export const MultiGroupSelection = ({
  initialGroups,
}: MultiGroupSelectionProps) => {
  const { watch, setValue } = useFormContext<TestAccessFormValues>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupForMembers, setSelectedGroupForMembers] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const selectedGroups = watch('groupIds') || [];

  const filteredGroups = initialGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleGroup = (groupId: string) => {
    const currentGroups = selectedGroups;
    const newGroups = currentGroups.includes(groupId)
      ? currentGroups.filter((id) => id !== groupId)
      : [...currentGroups, groupId];
    setValue('groupIds', newGroups, { shouldValidate: true });
  };

  return (
    <>
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle className="flex items-center justify-between">
            Selected Groups
            <Badge variant="secondary">{selectedGroups.length} selected</Badge>
          </CardTitle>
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {!filteredGroups.length ? (
              <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                <Users
                  size={48}
                  className="mb-4 text-gray-400"
                />
                <p className="text-lg font-medium">No matching groups found</p>
                <p className="text-sm">Try adjusting your search</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGroups.map((group) => (
                  <div
                    key={group.id}
                    className={cn(
                      'flex cursor-pointer items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent',
                      selectedGroups.includes(group.id) &&
                        'border-primary bg-primary/5'
                    )}
                  >
                    <div
                      className="flex-1"
                      onClick={() => toggleGroup(group.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{group.name}</h4>
                        {selectedGroups.includes(group.id) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      {group.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {group.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-xs"
                        >
                          {group.memberCount.value} members
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          Created{' '}
                          {new Date(group.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroupForMembers({
                          id: group.id,
                          name: group.name,
                        });
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      {selectedGroupForMembers && (
        <ViewMembersModal
          groupId={selectedGroupForMembers.id}
          groupName={selectedGroupForMembers.name}
          isOpen={true}
          onClose={() => setSelectedGroupForMembers(null)}
        />
      )}
    </>
  );
};
