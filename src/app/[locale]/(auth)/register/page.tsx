import { NextPage } from 'next';

import RegistrationForm from '@/app/[locale]/(auth)/components/RegisterForm';

const LoginPage: NextPage = () => {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
};

export default LoginPage;
