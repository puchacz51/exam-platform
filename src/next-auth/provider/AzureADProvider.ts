import AzureAD from 'next-auth/providers/azure-ad';
import { User } from 'next-auth';
import { eq } from 'drizzle-orm';

import { usersTable } from '@schemas/users';
import db from '@/lib/db';

export const AzureADProvider = AzureAD({
  clientId: process.env.AZURE_AD_CLIENT_ID,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  tenantId: process.env.AZURE_AD_TENANT_ID,
  authorization: { params: { scope: 'openid profile email' } },
  profile: async (profile) => {
    const email = profile.email ?? profile.preferred_username;
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .execute();

    if (!existingUser) {
      const newUser = await db
        .insert(usersTable)
        .values({
          email: email,
          passwordHash: '',
          profileNeedsCompletion: true,
        })
        .returning()
        .execute();

      return { ...newUser[0], profileNeedsCompletion: true } as unknown as User;
    }

    return existingUser as unknown as User;
  },
});
