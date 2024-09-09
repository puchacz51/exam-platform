import AzureAD from 'next-auth/providers/azure-ad';
import { eq } from 'drizzle-orm';
import { usersTable } from '@schema/users';

import db from '@/lib/db';

export const AzureADProvider = AzureAD({
  clientId: process.env.AZURE_AD_CLIENT_ID,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  tenantId: process.env.AZURE_AD_TENANT_ID,
  authorization: { params: { scope: 'openid profile email offline_access' } },
  profile: async (profile, tokens) => {

    const email = profile.email ?? profile.preferred_username;
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .execute();

    if (!existingUser) {
      const [newUser] = await db
        .insert(usersTable)
        .values({
          email: email,
          passwordHash: '',
          profileNeedsCompletion: true,
          authProvider: 'azure-ad',
          emailConfirmed: new Date(),
        })
        .returning()
        .execute();

      return {
        authProvider: 'azure-ad',
        createdAt: newUser.createdAt,
        emailConfirmed: newUser.emailConfirmed,
        email: newUser.email,
        firstname: '',
        lastname: '',
        profileNeedsCompletion: newUser.profileNeedsCompletion,
        userID: newUser.id,
        accessToken: tokens['access_token'] as string,
        refreshToken: tokens['refresh_token'] as string,
      };
    }

    return {
      authProvider: 'azure-ad',
      createdAt: existingUser.createdAt,
      emailConfirmed: existingUser.emailConfirmed,
      email: existingUser.email,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      profileNeedsCompletion: existingUser.profileNeedsCompletion,
      userID: existingUser.id,
      accessToken: tokens['access_token'] as string,
      refreshToken: tokens['refresh_token'] as string,
    };
  },
});
