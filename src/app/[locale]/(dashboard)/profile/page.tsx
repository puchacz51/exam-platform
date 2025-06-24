import { NextPage } from 'next';

import ProfileEditForm from './components/ProfileEditForm';

const ProfilePage: NextPage = () => {
  return (
    <div className="container mx-auto py-8">
      <ProfileEditForm />
    </div>
  );
};

export default ProfilePage;
