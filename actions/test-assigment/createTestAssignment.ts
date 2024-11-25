'use server';

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { TestAccessFormValues } from '@/app/[locale]/(dashboard)/test-assignment/schema/TestAccessSchema';
import { testAccessConfigTable } from '@schema/TestAccess';
import { testAccessGroupsTable } from '@schema/testAccessGroups';

async function createTestAssignment(
  testId: string,
  data: TestAccessFormValues
) {
  return await db.transaction(async (tx) => {
    const [createdConfig] = await tx
      .insert(testAccessConfigTable)
      .values({
        testId,
        accessType: data.accessType,
        accessCode: data.accessCode,
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        timeLimit: data.timeLimit,
        maxAttempts: data.maxAttempts,
        minTimeBetweenAttempts: data.minTimeBetweenAttempts,
        requiresRegistration: data.requiresRegistration,
        showResultsAfterSubmission: data.showResultsAfterSubmission,
      })
      .returning();

    if (data.groupIds && data.groupIds.length > 0) {
      await tx.insert(testAccessGroupsTable).values(
        data.groupIds.map((groupId) => ({
          testAccessConfigId: createdConfig.id,
          groupId,
          sourceType: 'INTERNAL' as const,
        }))
      );
    }

    return createdConfig;
  });
}

export async function createTestAssignmentAction(
  testId: string,
  data: TestAccessFormValues
) {
  try {
    const session = await auth();
    if (!session?.user?.userID) {
      return {
        success: false,
        error: 'Unauthorized access. Please log in.',
      };
    }

    const result = await createTestAssignment(testId, data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating test assignment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
