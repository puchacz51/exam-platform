'use server';

import { Client } from '@microsoft/microsoft-graph-client';

import { auth } from '@/next-auth/auth';

export interface TeamsGroup {
  id: string;
  displayName: string;
}

export async function getUserTeamsGroups(): Promise<TeamsGroup[]> {
  try {
    const session = await auth();

    if (!session?.user) {
      return [];
    }

    const accessToken = session.user.accessToken;
    if (!accessToken) {
      return [];
    }

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    const response = await client
      .api('/me/teamwork/associatedTeams')
      .select('id,displayName')
      .get();

    const teams = response.value;

    const teamsWithDetails = teams.map((team: any) => ({
      id: team.id,
      displayName: team.displayName,
    }));

    return teamsWithDetails;
  } catch (error) {
    console.error('Error fetching Teams groups:', error);
    return [];
  }
}

export type TeamsGroupsResponse = Awaited<
  ReturnType<typeof getUserTeamsGroups>
>;
