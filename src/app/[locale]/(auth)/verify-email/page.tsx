import { NextPage } from 'next';

import EmailVerificationForm from '../components/VerifyEmailForm';

const LoginPage: NextPage = () => {
  return (
    <div>
      <EmailVerificationForm />
    </div>
  );
};

export default LoginPage;
