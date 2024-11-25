'use server';

import { and, eq } from 'drizzle-orm';

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { groupsTable } from '@schema/groups';
import { userGroupsTable } from '@schema/userGroups';

export async function updateGroup(
  groupId: string,
  data: { name: string; description: string | null }
) {
  try {
    const session = await auth();
    if (!session?.user?.userID) throw new Error('Unauthorized');

    await db
      .update(groupsTable)
      .set(data)
      .where(
        and(
          eq(groupsTable.id, groupId),
          eq(groupsTable.ownerId, session.user.userID)
        )
      );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update group',
    };
  }
}

export async function deleteGroup(groupId: string) {
  try {
    const session = await auth();
    if (!session?.user?.userID) throw new Error('Unauthorized');

    await db
      .delete(groupsTable)
      .where(
        and(
          eq(groupsTable.id, groupId),
          eq(groupsTable.ownerId, session.user.userID)
        )
      );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete group',
    };
  }
}

export async function addGroupMember(groupId: string, userId: string) {
  try {
    await db
      .insert(userGroupsTable)
      .values({ groupId, userId })
      .onConflictDoNothing();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add member',
    };
  }
}

export async function removeGroupMember(groupId: string, userId: string) {
  try {
    await db
      .delete(userGroupsTable)
      .where(
        and(
          eq(userGroupsTable.groupId, groupId),
          eq(userGroupsTable.userId, userId)
        )
      );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove member',
    };
  }
}
