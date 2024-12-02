import { eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccess';
import { testsTable } from '@schema/test';
import { testAccessGroupsTable } from '@schema/testAccessGroups';
import { groupsTable } from '@schema/groups';
import { auth } from '@/next-auth/auth';

export async function getTestOwnerAssignments() {
  const sessions = await auth();

  if (!sessions?.user?.userID) {
    throw new Error('Unauthorized');
  }

  const userId = sessions.user.userID;

  const assignments = await db
    .select({
      testId: testsTable.id,
      testTitle: testsTable.title,
      testDescription: testsTable.description,
      accessType: testAccessConfigTable.accessType,
      accessCode: testAccessConfigTable.accessCode,
      groupId: groupsTable.id,
      groupName: groupsTable.name,
      assignedBy: testAccessConfigTable.assignedBy,
    })
    .from(testAccessConfigTable)
    .innerJoin(testsTable, eq(testAccessConfigTable.testId, testsTable.id))
    .leftJoin(
      testAccessGroupsTable,
      eq(testAccessGroupsTable.testAccessConfigId, testAccessConfigTable.id)
    )
    .leftJoin(groupsTable, eq(testAccessGroupsTable.groupId, groupsTable.id))
    .where(eq(testAccessConfigTable.assignedBy, userId));

  return assignments;
}
