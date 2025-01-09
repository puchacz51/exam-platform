/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { and, eq, gt, isNull, or } from 'drizzle-orm';
import { asc } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccesss';
import { testAccessGroupsTable } from '@schema/testAccessGroups';
import { groupsTable } from '@schema/groups';
import { userGroupsTable } from '@schema/userGroups';
import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';

export async function getActiveUserTestAssignments(limit: number = 10) {
  const session = await auth();

  if (!session?.user?.userID) {
    throw new Error('Unauthorized');
  }

  const now = new Date();

  const assignments = await db.query.tests.findMany({
    where: (testsTable, { exists }) =>
      exists(
        db
          .select()
          .from(testAccessConfigTable)
          .innerJoin(
            testAccessGroupsTable,
            eq(
              testAccessGroupsTable.testAccessConfigId,
              testAccessConfigTable.id
            )
          )
          .innerJoin(
            groupsTable,
            eq(testAccessGroupsTable.groupId, groupsTable.id)
          )
          .innerJoin(
            userGroupsTable,
            and(
              eq(userGroupsTable.groupId, groupsTable.id),
              eq(userGroupsTable.userId, session.user.userID)
            )
          )
          .where(
            and(
              eq(testAccessConfigTable.testId, testsTable.id),
              or(
                isNull(testAccessConfigTable.endsAt),
                gt(testAccessConfigTable.endsAt, now)
              ),
              isNull(testAttemptsTable.finishedAt)
            )
          )
      ),
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
    limit,
  });
  console.log(assignments);

  const items = assignments.map((test) => {
    if (test) {
      test.QG = test.QG.map((group) => ({
        ...group,
        questions: group.qOnQG.map((qog) => qog.question),
      }));
    }
    return test;
  });

  return {
    items,
    metadata: {
      totalCount: items.length,
      currentPage: 1,
      totalPages: 1,
      limit,
    },
  };
}

export type ActiveUserTestAssignmentsResponse = Awaited<
  ReturnType<typeof getActiveUserTestAssignments>
>;
