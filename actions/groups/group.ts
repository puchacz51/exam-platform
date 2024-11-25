'use server';

import { and, eq, inArray } from 'drizzle-orm';
import { z } from 'zod';

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { userGroupsTable } from '@schema/userGroups';
import { groupsTable, type SelectGroup } from '@schema/groups';
import { usersTable } from '@schema/users';
import { createGroupSchema } from '@/app/[locale]/(dashboard)/groups/schema';

type TransactionFunction = Parameters<typeof db.transaction>[0];
type Tx = Parameters<TransactionFunction>[0];

type GroupResult<T = SelectGroup> = {
  success: boolean;
  data?: T;
  error?: string;
};

type AddUsersResult = {
  addedUsers: number;
  groupId: string;
};

async function createGroupWithUsers(
  tx: Tx,
  data: z.infer<typeof createGroupSchema>
) {
  const session = await auth();

  if (!session?.user?.userID) {
    throw new Error('Unauthorized');
  }

  const [newGroup] = await tx
    .insert(groupsTable)
    .values({
      name: data.name,
      description: data.description || null,
      ownerId: session.user.userID,
    })
    .returning();

  if (data.users && data.users.length > 0) {
    await tx.insert(userGroupsTable).values(
      data.users.map((user) => ({
        name: user.label,
        userId: user.value,
        groupId: newGroup.id,
      }))
    );
  }

  return newGroup;
}

export async function createGroup(
  data: z.infer<typeof createGroupSchema>
): Promise<GroupResult<SelectGroup>> {
  try {
    const group = await db.transaction(async (tx) => {
      return await createGroupWithUsers(tx, data);
    });

    return { success: true, data: group };
  } catch (error) {
    console.error('Error creating group:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create group',
    };
  }
}

async function addNewUsersToGroupTx(
  tx: Tx,
  groupId: string,
  userIds: string[]
): Promise<AddUsersResult> {
  const group = await tx
    .select()
    .from(groupsTable)
    .where(eq(groupsTable.id, groupId))
    .limit(1);

  if (!group.length) {
    throw new Error('Group not found');
  }

  const existingUsers = await tx
    .select()
    .from(userGroupsTable)
    .where(
      and(
        eq(userGroupsTable.groupId, groupId),
        inArray(userGroupsTable.userId, userIds)
      )
    );

  const existingUserIds = new Set(existingUsers.map((u) => u.userId));
  const newUserIds = userIds.filter((id) => !existingUserIds.has(id));
  if (newUserIds.length > 0) {
    const users = await tx
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(inArray(usersTable.id, newUserIds));

    await tx.insert(userGroupsTable).values(
      users.map((user) => ({
        userId: user.id,
        groupId,
      }))
    );
  }

  return {
    addedUsers: newUserIds.length,
    groupId: group[0].id,
  };
}

export async function addUsersToGroup(
  groupId: string,
  userIds: string[]
): Promise<GroupResult<AddUsersResult>> {
  try {
    const result = await db.transaction(async (tx) => {
      return await addNewUsersToGroupTx(tx, groupId, userIds);
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error adding users to group:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to add users to group',
    };
  }
}
