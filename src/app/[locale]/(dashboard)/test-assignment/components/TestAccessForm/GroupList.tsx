import { Check, Eye, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { UserGroups } from '@actions/groups/getGroup';

interface GroupListProps {
  groups: NonNullable<UserGroups['data']>;
  selectedGroups: string[];
  onGroupSelect: (groupId: string) => void;
  onViewMembers?: (group: { id: string; name: string }) => void;
}

const GroupList = ({
  groups,
  selectedGroups,
  onGroupSelect,
  onViewMembers,
}: GroupListProps) => {
  const t = useTranslations('dashboard.testAssignment');

  return (
    <ScrollArea className="h-[300px] pr-4">
      {!groups.length ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <Users
            size={48}
            className="mb-4 text-gray-400"
          />
          <p className="text-lg font-medium">{t('noMatchingGroups')}</p>
          <p className="text-sm">{t('tryAdjustingSearch')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className={cn(
                'flex cursor-pointer items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent',
                selectedGroups.includes(group.id) &&
                  'border-primary bg-primary/5'
              )}
            >
              <div
                tabIndex={-1}
                role="button"
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onGroupSelect(group.id);
                }}
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
                    {group.memberCount?.value || 0} members
                  </Badge>
                  {group.createdAt && (
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      Created {new Date(group.createdAt).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>
              {onViewMembers && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onViewMembers({
                      id: group.id,
                      name: group.name,
                    });
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default GroupList;
