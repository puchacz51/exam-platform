import { ReactNode } from 'react';

import '@/app/[locale]/globals.css';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { auth } from '@/next-auth/auth';
import DashboardHeader from '@/app/[locale]/(dashboard)/components/DashboardHeader';
import DashboardFooter from '@/app/[locale]/(dashboard)/components/DashboardFooter';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const session = await auth();
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ReactQueryProvider>
          <SessionProvider session={session}>
            <div className="flex min-h-screen flex-col">
              <DashboardHeader />
              <main className="flex-grow">{children}</main>
              <DashboardFooter />
            </div>
          </SessionProvider>
        </ReactQueryProvider>
      </NextIntlClientProvider>
    </>
  );
};

export default RootLayout;
