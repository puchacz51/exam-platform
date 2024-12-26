import { Check, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TeamsGroup } from '@actions/groups/teamsGroup';

interface TeamsGroupListProps {
  groups: TeamsGroup[];
  selectedGroups: string[];
  onGroupSelect: (groupId: string) => void;
}

const TeamsGroupList = ({ 
  groups, 
  selectedGroups, 
  onGroupSelect 
}: TeamsGroupListProps) => {
  const t = useTranslations('dashboard.testAssignment');

  return (
    <ScrollArea className="h-[300px] pr-4">
      {!groups.length ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <Users
            size={48}
            className="mb-4 text-gray-400"
          />
          <p className="text-lg font-medium">{t('teamsGroups.noGroups')}</p>
          <p className="text-sm">{t('tryAdjustingSearch')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className={cn(
                'flex cursor-pointer items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent',
                selectedGroups.includes(group.id) && 'border-primary bg-primary/5'
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
                  <h4 className="font-medium">{group.displayName}</h4>
                  {selectedGroups.includes(group.id) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Teams Group
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default TeamsGroupList;