import { ReactNode } from 'react';

import '@/app/[locale]/globals.css';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { auth } from '@/next-auth/auth';
import DashboardHeader from '@/app/[locale]/(dashboard)/components/DashboardHeader';
import DashboardFooter from '@/app/[locale]/(dashboard)/components/DashboardFooter';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const session = await auth();
  const messages = await getMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <SessionProvider session={session}>
          <div className="flex min-h-screen flex-col">
            <DashboardHeader />
            <main className="flex-grow">{children}</main>
            <DashboardFooter />
          </div>
        </SessionProvider>
      </NextIntlClientProvider>
    </>
  );
};

export default RootLayout;
