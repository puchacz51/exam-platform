import { Inter } from 'next/font/google';

import Header from '@/app/[locale]/(public)/components/layout/Header';
import '@/app/[locale]/globals.css';
import { LanguageSwitcher } from '@/app/[locale]/(public)/components/layout/LanguageSwitcher';

import Providers from './providers/Providers';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
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
