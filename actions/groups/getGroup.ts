'use server';

import { count, eq } from 'drizzle-orm';

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { groupsTable } from '@schema/groups';
import { userGroupsTable } from '@schema/userGroups';
import { usersTable } from '@schema/users';
import type {
  Group,
  GroupMember,
  GroupMembersResponse,
  GroupsResponse,
} from '@/types/group/group';

async function getGroupMemberCount(groupId: string) {
  const [result] = await db
    .select({
      count: count(userGroupsTable.userId),
    })
    .from(userGroupsTable)
    .where(eq(userGroupsTable.groupId, groupId));
  return result.count;
}

async function getGroupsCount(userId: string) {
  const [result] = await db
    .select({
      count: count(groupsTable.id),
    })
    .from(groupsTable)
    .where(eq(groupsTable.ownerId, userId));
  return result.count;
}

export async function getUserGroups(limit?: number): Promise<GroupsResponse> {
  try {
    const session = await auth();
    if (!session?.user?.userID) {
      throw new Error('Unauthorized');
    }

    const query = db
      .select({
        id: groupsTable.id,
        name: groupsTable.name,
        description: groupsTable.description,
        createdAt: groupsTable.createdAt,
        isOwner: eq(groupsTable.ownerId, session.user.userID),
      })
      .from(groupsTable)
      .where(eq(groupsTable.ownerId, session.user.userID))
      .limit(limit || -10);

    const groups = await query;
    const totalCount = await getGroupsCount(session.user.userID);

    const groupsWithCounts = await Promise.all(
      groups.map(async (group) => ({
        ...group,
        memberCount: { value: await getGroupMemberCount(group.id) },
      }))
    );

    return {
      success: true,
      data: groupsWithCounts as Group[],
      totalCount,
    };
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch groups',
      data: [],
      totalCount: 0,
    };
  }
}

export async function getGroupMembers(
  groupId: string
): Promise<GroupMembersResponse> {
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

    return { success: true, data: members as GroupMember[] };
  } catch (error) {
    console.error('Error fetching group members:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch members',
      data: [],
    };
  }
}

export type GroupResponse = {
  success: boolean;
  data?: {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date | null;
    ownerId: string;
    memberCount: { value: number };
    isOwner: boolean;
  };
  error?: string;
};

export async function getGroupById(groupId: string): Promise<GroupResponse> {
  try {
    const session = await auth();
    if (!session?.user?.userID) {
      throw new Error('Unauthorized');
    }

    const [group] = await db
      .select({
        id: groupsTable.id,
        name: groupsTable.name,
        description: groupsTable.description,
        createdAt: groupsTable.createdAt,
        ownerId: groupsTable.ownerId,
      })
      .from(groupsTable)
      .where(eq(groupsTable.id, groupId));

    if (!group) {
      return { success: false, error: 'Group not found' };
    }

    const memberCount = await getGroupMemberCount(groupId);

    return {
      success: true,
      data: {
        ...group,
        memberCount: { value: memberCount },
        isOwner: group.ownerId === session.user.userID,
      },
    };
  } catch (error) {
    console.error('Error fetching group:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch group',
    };
  }
}
