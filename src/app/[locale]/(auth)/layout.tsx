import { Inter } from 'next/font/google';
import '@/app/[locale]/globals.css';
import { SessionProvider } from 'next-auth/react';

import Header from '@/app/[locale]/(auth)/components/layout/Header';
import { cn } from '@/lib/utils';

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
