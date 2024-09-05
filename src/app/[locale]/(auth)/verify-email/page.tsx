import { NextPage } from 'next';

import EmailVerificationForm from '@/app/[locale]/(auth)/components/VerificationEmailForm';

const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-grow items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <EmailVerificationForm />
    </div>
  );
};

export default LoginPage;
