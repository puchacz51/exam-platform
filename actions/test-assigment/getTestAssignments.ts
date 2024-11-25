import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/TestAccess';
import { testsTable } from '@schema/test';
import { eq } from 'drizzle-orm';
import { testAccessGroupsTable } from '@schema/testAccessGroups';
import { groupsTable } from '@schema/groups';
import { auth } from '@/next-auth/auth';

export async function getTestAssignments() {
  const sessions = await auth();

  if (!sessions?.user?.userID) {
    throw new Error('Unauthorized');
  }

  const assignments = await db
    .select({
      testId: testsTable.id,
      testTitle: testsTable.title,
      testDescription: testsTable.description,
      accessType: testAccessConfigTable.accessType,
      accessCode: testAccessConfigTable.accessCode,
      groupId: groupsTable.id,
      groupName: groupsTable.name,
    })
    .from(testAccessConfigTable)
    .innerJoin(testsTable, eq(testAccessConfigTable.testId, testsTable.id))
    .leftJoin(
      testAccessGroupsTable,
      eq(testAccessGroupsTable.testAccessConfigId, testAccessConfigTable.id)
    )
    .leftJoin(groupsTable, eq(testAccessGroupsTable.groupId, groupsTable.id));

  return assignments;
}
