import { emailVerificationTokensTable } from './email_verification_tokens';
import { usersTable } from './users';

export const schema = {
  users: usersTable,
  email_verification_tokens: emailVerificationTokensTable,
};
