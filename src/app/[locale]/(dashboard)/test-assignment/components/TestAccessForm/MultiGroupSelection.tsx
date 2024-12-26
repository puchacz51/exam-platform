import { useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Group } from '@/types/group/group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTeamsGroups } from '@/hooks/useTeamsGroups';
import { Spinner } from '@/components/ui/spinner';
import TeamsGrupList from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/TeamsGroupList';
import GroupList from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/GroupList';
import { TestAccessFormValues } from '@/app/[locale]/(dashboard)/test-assignment/schema/TestAccessSchema';
import { ViewMembersModal } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm/ViewMembersModal';

interface MultiGroupSelectionProps {
  initialGroups?: Group[];
}

export const MultiGroupSelection = ({
  initialGroups = [],
}: MultiGroupSelectionProps) => {
  const session = useSession();
  const isTeamsUser = session?.data?.user?.authProvider === 'azure-ad';
  const { data: teamsGroups, isLoading: isLoadingTeamsGroups } =
    useTeamsGroups(isTeamsUser);
  const t = useTranslations('dashboard');

  const { watch, setValue } = useFormContext<TestAccessFormValues>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupForMembers, setSelectedGroupForMembers] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const selectedGroups = watch('groupIds') || [];
  const selectedTeamsGroups = watch('teamsIds') || [];

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

  const toggleTeamsGroup = (groupId: string) => {
    const currentGroups = selectedTeamsGroups;
    const newGroups = currentGroups.includes(groupId)
      ? currentGroups.filter((id) => id !== groupId)
      : [...currentGroups, groupId];
    setValue('teamsIds', newGroups, { shouldValidate: true });
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle className="flex items-center justify-between">
          {t('groups.selected', {
            count: selectedGroups.length + selectedTeamsGroups.length,
          })}
          <Badge variant="secondary">
            {selectedGroups.length + selectedTeamsGroups.length} selected
          </Badge>
        </CardTitle>
        <Input
          placeholder={t('groups.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </CardHeader>
      <CardContent>
        {isTeamsUser ? (
          <Tabs defaultValue="regular">
            <TabsList className="mb-4">
              <TabsTrigger value="regular">{t('groups.types.all')}</TabsTrigger>
              <TabsTrigger value="teams">{t('groups.types.teams')}</TabsTrigger>
            </TabsList>
            <TabsContent value="regular">
              <GroupList
                groups={filteredGroups}
                selectedGroups={selectedGroups}
                onGroupSelect={toggleGroup}
                onViewMembers={(group) => setSelectedGroupForMembers(group)}
              />
            </TabsContent>
            <TabsContent value="teams">
              {isLoadingTeamsGroups ? (
                <div className="flex justify-center p-4">
                  <Spinner className="h-6 w-6" />
                </div>
              ) : teamsGroups?.length ? (
                <TeamsGrupList
                  groups={teamsGroups.filter((group) =>
                    group.displayName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )}
                  selectedGroups={selectedTeamsGroups}
                  onGroupSelect={toggleTeamsGroup}
                />
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  {t('testAssignment.teamsGroups.noGroups')}
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <GroupList
            groups={filteredGroups}
            selectedGroups={selectedGroups}
            onGroupSelect={toggleGroup}
            onViewMembers={(group) => setSelectedGroupForMembers(group)}
          />
        )}
      </CardContent>
      {selectedGroupForMembers && (
        <ViewMembersModal
          groupId={selectedGroupForMembers.id}
          groupName={selectedGroupForMembers.name}
          isOpen={true}
          onClose={() => setSelectedGroupForMembers(null)}
        />
      )}
    </Card>
  );
};
