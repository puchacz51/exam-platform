'use server';

import { eq } from 'drizzle-orm';
import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccesss';

export const getTestAccessInfo = async (testAccessId: string) => {
  try {
    const testAccessInfo = await db.query.testAccess.findFirst({
      where: eq(testAccessConfigTable.id, testAccessId),
      with: {
        test: {
          with: {
            QG: {
              with: {
                qOnQG: {
                  with: {
                    question: {
                      columns: {
                        points: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return testAccessInfo;
  } catch (error) {
    console.error('Error fetching test access info:', error);
    throw new Error('Failed to fetch test access info');
  }
};
