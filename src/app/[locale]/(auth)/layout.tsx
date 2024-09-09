import { Inter } from 'next/font/google';

import '@/app/[locale]/globals.css';
import Header from '@/app/[locale]/(auth)/components/layout/Header';
import { cn } from '@/lib/utils';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex min-h-screen flex-col')}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
