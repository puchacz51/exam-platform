import { getUserTeamsGroups } from '@actions/groups/teamsGroup';
import { getUserGroups } from '@actions/groups/getGroup';
import { Card } from '@/components/ui/card';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import GroupList from '@/app/[locale]/(dashboard)/groups/components/GroupList';
import { CreateGroupForm } from '@/app/[locale]/(dashboard)/groups/components/CreateGroupForm';
import OwnedGroupList from '@/app/[locale]/(dashboard)/groups/components/OwnedGroupList';
import { auth } from '@/next-auth/auth';
import { Separator } from '@/components/ui/separator';

const GroupsPage = async () => {
  const session = await auth();
  const isTeamsUser = session?.user.authProvider === 'azure-ad';
  const [ownedGroups, teamsGroups] = await Promise.all([
    getUserGroups(),
    isTeamsUser ? getUserTeamsGroups() : Promise.resolve({ data: [] }),
  ]);

  return (
    <ReactQueryProvider>
      <div className="container mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Groups Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage your groups, add members and organize your team.
          </p>
          <Separator />
        </div>

        <div className="grid gap-8">
          <section>
            <Card className="p-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Create New Group
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Set up a new group and invite members to collaborate.
                  </p>
                </div>
                <CreateGroupForm />
              </div>
            </Card>
          </section>

          <section className="grid gap-6">
            <Card className="p-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    My Groups
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Groups you have created and manage.
                  </p>
                </div>
                <OwnedGroupList initialGroups={ownedGroups?.data || []} />
              </div>
            </Card>
          </section>

          {isTeamsUser && (
            <section className="grid gap-6">
              <Card className="p-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Teams Groups
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your Microsoft Teams synchronized groups.
                    </p>
                  </div>
                  <GroupList
                    groups={
                      Array.isArray(teamsGroups)
                        ? teamsGroups
                        : teamsGroups.data
                    }
                  />
                </div>
              </Card>
            </section>
          )}
        </div>
      </div>
    </ReactQueryProvider>
  );
};

export default GroupsPage;
