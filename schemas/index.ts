import { usersTable } from '@schemas/users';
import { emailVerificationTokensTable } from '@schemas/email_verification_tokens';

export const schema = {
  users: usersTable,
  email_verification_tokens: emailVerificationTokensTable,
};
