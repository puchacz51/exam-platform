import { FC } from 'react';

import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

const AlternativeSignUpMethods: FC = () => {
  const t = useTranslations('auth');

  const handleMicrosoftSignUp = () => {
    signIn('azure-ad', { callbackUrl: '/dashboard' });
  };

  const handleUSOSSignUp = () => {
    signIn('usos', { callbackUrl: '/dashboard' });
  };

  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <>
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">
            {t('alternativeMethods.title')}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          onClick={handleMicrosoftSignUp}
        >
          {t('alternativeMethods.microsoft')}
        </Button>
        <Button
          variant="outline"
          onClick={handleUSOSSignUp}
        >
          {t('alternativeMethods.usos')}
        </Button>
        <Button
          variant="outline"
          onClick={handleGoogleSignUp}
        >
          {t('alternativeMethods.google')}
        </Button>
      </div>
    </>
  );
};

export default AlternativeSignUpMethods;
