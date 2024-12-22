'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';

import { useGroupMembers } from '@/hooks/useGroupMembers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GroupItemProps {
  group: {
    id: string;
    name: string;
    description?: string | null;
    memberCount: { value: number };
  };
}

export const GroupItem = ({ group }: GroupItemProps) => {
  const t = useTranslations('dashboard.groups');
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: members, isLoading } = useGroupMembers(group.id, isExpanded);

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="border-b bg-gray-50/50 p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold tracking-tight">
              {group.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Users size={12} />
                {t('card.member', { count: group.memberCount.value })}
              </Badge>
              {isExpanded ? (
                <span className="text-sm text-muted-foreground">
                  {t('hideMembers')}
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => setIsExpanded(true)}
                >
                  {t('viewMembers')}
                </Button>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        {group.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {group.description}
          </p>
        )}
      </div>

      {isExpanded && (
        <div className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
            </div>
          ) : (
            <ScrollArea className="h-[300px] p-4">
              <div className="space-y-2">
                {members?.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
                  >
                    <Avatar className="h-8 w-8">
                      <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                        {member.firstname[0]}
                        {member.lastname[0]}
                      </div>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-medium">
                        {member.firstname} {member.lastname}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="ml-auto"
                    >
                      {t('card.member')}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      )}
    </Card>
  );
};
