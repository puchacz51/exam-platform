import { getTranslations } from 'next-intl/server';

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

  const [t, ownedGroups, teamsGroups] = await Promise.all([
    getTranslations('dashboard.groups'),
    getUserGroups(),
    isTeamsUser ? getUserTeamsGroups() : Promise.resolve({ data: [] }),
  ]);

  return (
    <ReactQueryProvider>
      <div className="container mx-auto mt-6 max-w-7xl space-y-8 px-2">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {t('management.title')}
          </h1>
          <p className="text-muted-foreground">{t('management.description')}</p>
          <Separator />
        </div>

        <div className="grid gap-8">
          <section>
            <Card className="p-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {t('create.sectionTitle')}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t('create.description')}
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
                    {t('owned.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t('owned.description')}
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
                      {t('teams.title')}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t('teams.description')}
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
