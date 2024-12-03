import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import '@/app/[locale]/globals.css';
import { SessionProvider } from 'next-auth/react';

import Header from '@/app/[locale]/(auth)/components/layout/Header';
import { LanguageSwitcher } from '@/app/[locale]/(public)/components/layout/LanguageSwitcher';
import { cn } from '@/lib/utils';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = async ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={cn(inter.className, 'flex min-h-screen flex-col')}>
        <SessionProvider>
          <NextIntlClientProvider
            messages={messages}
            locale={locale}
          >
            <Header>
              <LanguageSwitcher />
            </Header>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
