import { NextPage } from 'next';

import { getBasicUserTestAssignments } from '@actions/test-assigment/getBasicUserTestAssignments';
import { getTestOwnerAssignments } from '@actions/test-assigment/getTestOwnerAssignments';
import { auth } from '@/next-auth/auth';
import { DashboardHeader } from '@/app/[locale]/(dashboard)/dashboard/components/DashboardHeader';
import { RecentTests } from '@/app/[locale]/(dashboard)/dashboard/components/RecentTests/RecentTests';
import { AssignedTests } from '@/app/[locale]/(dashboard)/dashboard/components/AssignedTests';
import { GroupsList } from '@/app/[locale]/(dashboard)/dashboard/components/GroupsList';
import { getUserGroups } from '@actions/groups/getGroup';
import { getUserTests } from '@actions/test/getUserTests';
import { getUserFinishedAttempts } from '@actions/attempt/getUserFinishedAttempt';

import { OwnedTests } from './components/OwnedTests';
import { FinishedAttempts } from './components/FinishedAttempts';

const DashboardPage: NextPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const [
    tests,
    assignedTestsResponse,
    ownedTestsAssignmentsResponse,
    groupsData,
    finishedAttemptsResponse,
  ] = await Promise.all([
    getUserTests(1, 5, { field: 'createdAt', direction: 'desc' }),
    getBasicUserTestAssignments(),
    getTestOwnerAssignments(),
    getUserGroups(8),
    getUserFinishedAttempts(),
  ]);

  const ownedTests = ownedTestsAssignmentsResponse.items;
  const groups = groupsData.success ? groupsData.data : [];
  const totalGroups = groupsData.success ? groupsData.totalCount : 0;
  const assignedTests = assignedTestsResponse.items;
  const finishedAttempts = finishedAttemptsResponse;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:space-y-8">
      <DashboardHeader />
      <div className="grid gap-6 sm:gap-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <section>
            <AssignedTests assignedTests={assignedTests} />
          </section>
          <section>
            <OwnedTests ownedTests={ownedTests} />
          </section>
        </div>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <RecentTests tests={tests.items} />
          </section>
          <section>
            <GroupsList
              groups={groups}
              totalCount={totalGroups}
            />
          </section>
        </div>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-1">
          <section>
            <FinishedAttempts attempts={finishedAttempts} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
