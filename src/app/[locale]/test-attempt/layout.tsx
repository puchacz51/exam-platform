import { ReactNode } from 'react';

import '@/app/[locale]/globals.css';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/next-auth/auth';

interface RootLayoutProps {
  children: ReactNode;
}

const TestAttemptLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen flex-col">
        <main className="flex-grow">{children}</main>
      </div>
    </SessionProvider>
  );
};

export default TestAttemptLayout;
