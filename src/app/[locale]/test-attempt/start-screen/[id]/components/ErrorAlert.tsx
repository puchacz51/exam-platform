import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorAlertProps {
  title: string;
  description: string;
}

export const ErrorAlert = async ({ title, description }: ErrorAlertProps) => {
  const t = await getTranslations('testAttempt.score');

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <Link href="/dashboard">
              {t('buttons.backToDashboard')}{' '}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
