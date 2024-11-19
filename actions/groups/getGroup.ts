'use server';

import { eq, count } from 'drizzle-orm';
import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { groupsTable } from '@schema/groups';
import { userGroupsTable } from '@schema/userGroups';
import { usersTable } from '@schema/users';

async function getGroupMemberCount(groupId: string) {
  const [result] = await db
    .select({
      count: count(userGroupsTable.userId),
    })
    .from(userGroupsTable)
    .where(eq(userGroupsTable.groupId, groupId));
  return result.count;
}

export async function getUserGroups() {
  try {
    const session = await auth();
    if (!session?.user?.userID) {
      throw new Error('Unauthorized');
    }

    const groups = await db
      .select({
        id: groupsTable.id,
        name: groupsTable.name,
        description: groupsTable.description,
        createdAt: groupsTable.createdAt,
        isOwner: eq(groupsTable.ownerId, session.user.userID),
      })
      .from(groupsTable)
      .where(eq(groupsTable.ownerId, session.user.userID));

    const groupsWithCounts = await Promise.all(
      groups.map(async (group) => ({
        ...group,
        memberCount: { value: await getGroupMemberCount(group.id) },
      }))
    );

    return { success: true, data: groupsWithCounts };
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch groups',
    };
  }
}

export async function getGroupMembers(groupId: string) {
  try {
    const members = await db
      .select({
        id: usersTable.id,
        firstname: usersTable.firstname,
        lastname: usersTable.lastname,
        email: usersTable.email,
      })
      .from(userGroupsTable)
      .leftJoin(usersTable, eq(userGroupsTable.userId, usersTable.id))
      .where(eq(userGroupsTable.groupId, groupId));

    return { success: true, data: members };
  } catch (error) {
    console.error('Error fetching group members:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch members',
    };
  }
}
