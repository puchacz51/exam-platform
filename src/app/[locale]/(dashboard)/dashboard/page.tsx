import { NextPage } from 'next';

import { getUserGroups } from '@actions/groups/getGroup';

import { DashboardHeader } from './components/DashboardHeader';
import { RecentTests } from './components/RecentTests';
import { AssignedTests } from './components/AssignedTests';
import { GroupsList } from './components/GroupsList';

const DashboardPage: NextPage = async () => {
  const tests: string[] = [];
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
