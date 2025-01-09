import { Inter } from 'next/font/google';

import Header from '@/app/[locale]/(public)/components/layout/Header';
import '@/app/[locale]/globals.css';
import { LanguageSwitcher } from '@/app/[locale]/(public)/components/layout/LanguageSwitcher';
import { cn } from '@/lib/utils';
import Providers from '@/app/[locale]/(public)/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html>
      <body className={cn(inter.className, 'flex min-h-screen flex-col')}>
        <Providers>
          <Header>
            <LanguageSwitcher />
          </Header>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
