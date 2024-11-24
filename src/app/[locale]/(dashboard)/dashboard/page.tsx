import { NextPage } from 'next';

import { getUserGroups } from '@actions/groups/getGroup';
import { getLatestUserTests } from '@actions/test/getLatestUserTests';
import { auth } from '@/next-auth/auth';
import { DashboardHeader } from '@/app/[locale]/(dashboard)/dashboard/components/DashboardHeader';
import { RecentTests } from '@/app/[locale]/(dashboard)/dashboard/components/RecentTests/RecentTests';
import { AssignedTests } from '@/app/[locale]/(dashboard)/dashboard/components/AssignedTests';
import { GroupsList } from '@/app/[locale]/(dashboard)/dashboard/components/GroupsList';

const DashboardPage: NextPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const tests = user ? await getLatestUserTests(user.userID, 5) : [];
  console.log(tests);
  const assignedTests: string[] = [];
  const groupsData = await getUserGroups(8);

  const groups = groupsData.success ? groupsData.data : [];
  const totalGroups = groupsData.success ? groupsData.totalCount : 0;

  return (
    <div className="container mx-auto space-y-6 p-4 sm:space-y-8 sm:py-8">
      <DashboardHeader />
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <RecentTests tests={tests} />
        </section>
        <section>
          <AssignedTests assignedTests={assignedTests} />
        </section>
        <section>
          <GroupsList
            groups={groups}
            totalCount={totalGroups}
          />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
