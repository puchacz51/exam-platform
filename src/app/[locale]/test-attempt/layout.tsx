import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/app/[locale]/globals.css';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/next-auth/auth';

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const TestAttemptLayout = async ({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) => {
  const session = await auth();
  const messages = await getMessages({ locale });

  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider
        messages={messages}
        locale={locale}
      >
        <div className="flex min-h-screen flex-col">
          <main className="flex-grow">{children}</main>
        </div>
      </NextIntlClientProvider>
    </SessionProvider>
  );
};

export default TestAttemptLayout;
