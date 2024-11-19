import { getUserTeamsGroups } from '@actions/groups/teamsGroup';
import { Card } from '@/components/ui/card';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import GroupList from '@/app/[locale]/(dashboard)/groups/components/GroupList';
import { CreateGroupForm } from '@/app/[locale]/(dashboard)/groups/components/CreateGroupForm';
import { auth } from '@/next-auth/auth';

const GroupsPage = async () => {
  const [groups] = await Promise.all([getUserTeamsGroups()]);
  const session = await auth();

  return (
    <ReactQueryProvider>
      <div className="container mx-auto py-8">
        <Card className="mb-8 p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Create New Group</h2>
          <CreateGroupForm />
        </Card>

        <Card className="p-8 shadow-lg">
          <h1 className="mb-8 text-3xl font-bold text-gray-800">Groups</h1>
          <GroupList groups={groups} />
        </Card>
      </div>
    </ReactQueryProvider>
  );
};

export default GroupsPage;
