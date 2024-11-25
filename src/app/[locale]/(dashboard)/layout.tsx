import { ReactNode } from 'react';

import '@/app/[locale]/globals.css';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/next-auth/auth';
import DashboardHeader from '@/app/[locale]/(dashboard)/components/DashboardHeader';
import DashboardFooter from '@/app/[locale]/(dashboard)/components/DashboardFooter';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const session = await auth();
  return (
    <>
      <SessionProvider session={session}>
        <div className="flex min-h-screen flex-col">
          <DashboardHeader />
          <main className="flex-grow">{children}</main>
          <DashboardFooter />
        </div>
      </SessionProvider>
    </>
  );
};

export default RootLayout;
