import { NextPage } from 'next';

import CompleteProfileForm from '../components/CompleteProfileForm';

const CompleteRegistrationPage: NextPage = () => {
  return (
    <div className="flex flex-grow items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <CompleteProfileForm />
    </div>
  );
};

export default CompleteRegistrationPage;
