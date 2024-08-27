import { NextPage } from 'next';

import LoginForm from '@/app/[locale]/(auth)/components/loginForm';

const LoginPage: NextPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
