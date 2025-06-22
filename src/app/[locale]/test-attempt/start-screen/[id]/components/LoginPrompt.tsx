'use client';

import { FC } from 'react';

import { useTranslations } from 'next-intl';
import { LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginPromptProps {
  testTitle?: string;
  returnUrl: string;
}

export const LoginPrompt: FC<LoginPromptProps> = ({ testTitle, returnUrl }) => {
  const t = useTranslations('auth');

  const handleLogin = () => {
    const loginUrl = new URL('/login', window.location.origin);
    loginUrl.searchParams.set('returnUrl', returnUrl);
    window.location.href = loginUrl.toString();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-gray-400" />
          <CardTitle className="text-2xl font-bold">Login Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-gray-600">
            {testTitle && (
              <p className="mb-2">To access this test, please log in first.</p>
            )}
            <p>You need to log in to continue.</p>
          </div>
          <Button
            onClick={handleLogin}
            className="w-full"
            size="lg"
          >
            <LogIn className="mr-2 h-4 w-4" />
            {t('login.title')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
