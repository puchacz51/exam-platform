import { and, eq, gt, isNull, or } from 'drizzle-orm';
import { asc } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccesss';
import { testsTable } from '@schema/test';
import { testAccessGroupsTable } from '@schema/testAccessGroups';
import { groupsTable } from '@schema/groups';
import { userGroupsTable } from '@schema/userGroups';
import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';
import { auth } from '@/next-auth/auth';

export async function getActiveUserTestAssignments() {
  const session = await auth();

  if (!session?.user?.userID) {
    throw new Error('Unauthorized');
  }

  const now = new Date();

  const accessibleTestIds = await db
    .select({ testId: testsTable.id })
    .from(testAccessConfigTable)
    .innerJoin(testsTable, eq(testAccessConfigTable.testId, testsTable.id))
    .innerJoin(
      testAccessGroupsTable,
      eq(testAccessGroupsTable.testAccessConfigId, testAccessConfigTable.id)
    )
    .innerJoin(groupsTable, eq(testAccessGroupsTable.groupId, groupsTable.id))
    .innerJoin(
      userGroupsTable,
      and(
        eq(userGroupsTable.groupId, groupsTable.id),
        eq(userGroupsTable.userId, session.user.userID)
      )
    )
    .where(
      and(
        or(
          isNull(testAccessConfigTable.endsAt),
          gt(testAccessConfigTable.endsAt, now)
        )
      )
    );

  const testIds = accessibleTestIds.map((t) => t.testId);

  const assignments = await Promise.all(
    testIds.map(async (testId) => {
      const test = await db.query.tests.findFirst({
        where: eq(testsTable.id, testId),
        with: {
          QG: {
            with: {
              qOnQG: {
                orderBy: [asc(questionOnQuestionGroupTable.order)],
                with: {
                  question: {
                    columns: {
                      questionType: true,
                      id: true,
                      text: true,
                      points: true,
                      isPublic: true,
                    },
                    with: {
                      orderItems: {
                        columns: {
                          id: true,
                          text: true,
                        },
                      },
                      category: {
                        columns: {
                          id: true,
                          name: true,
                        },
                      },
                      matchingPairs: true,
                    },
                  },
                },
              },
            },
          },
          settings: true,
        },
      });

      if (test) {
        test.QG = test.QG.map((group) => ({
          ...group,
          questions: group.qOnQG.map((qog) => qog.question),
        }));
      }

      return test;
    })
  );

  return assignments.filter(Boolean);
}
