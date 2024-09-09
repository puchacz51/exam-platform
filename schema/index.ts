import { usersTable } from '@schema/users';
import { emailVerificationTokensTable } from '@schema/email_verification_tokens';

export const schema = {
  users: usersTable,
  email_verification_tokens: emailVerificationTokensTable,
};
