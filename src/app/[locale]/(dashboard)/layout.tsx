import { Inter } from 'next/font/google';
import '@/app/[locale]/globals.css';
import { SessionProvider } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { auth } from '@/next-auth/auth';

import DashboardHeader from './components/DashboardHeader';
// import DashboardNavbar from './components/DashboardNavbar'
import DashboardFooter from './components/DashboardFooter';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const session = await auth();
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex min-h-screen flex-col')}>
        <SessionProvider session={session}>
          <DashboardHeader />
          {/* <DashboardNavbar /> */}
          {children}
          <DashboardFooter />
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
