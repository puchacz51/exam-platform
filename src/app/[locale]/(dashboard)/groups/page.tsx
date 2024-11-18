import { getUserTeamsGroups } from '@actions/groups/teamsGroup';
import { Card } from '@/components/ui/card';

import GroupList from './components/GroupList';

export default async function GroupsPage() {
  const groups = await getUserTeamsGroups();

  return (
    <div className="container mx-auto py-8">
      <Card className="p-8 shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Groups</h1>
        <GroupList groups={groups} />
      </Card>
    </div>
  );
}
