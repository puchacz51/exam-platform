'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface AuthHeaderProps {
  children?: React.ReactNode;
}

const AuthHeader = ({ children }: AuthHeaderProps) => {
  const t = useTranslations('auth');
  const pathname = usePathname();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900"
            >
              Logo
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {children}
            <nav className="flex space-x-4">
              <Button
                variant="ghost"
                asChild
                className={cn('hidden', pathname === '/register' && 'block')}
              >
                <Link href="/login">{t('login.title')}</Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className={cn('hidden', pathname === '/login' && 'block')}
              >
                <Link href="/register">{t('register.title')}</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
