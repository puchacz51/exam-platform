import { Inter } from 'next/font/google';

import '@/app/[locale]/globals.css';
import Header from '@/app/[locale]/(auth)/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
