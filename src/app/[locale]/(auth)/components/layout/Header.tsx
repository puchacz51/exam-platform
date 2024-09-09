'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const AuthHeader = () => {
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900"
            >
              Logo
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Button
              variant="ghost"
              asChild
              className={cn('hidden', pathname === '/register' && 'block')}
            >
              <Link href="/login">Logowanie</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className={cn('hidden', pathname === '/login' && 'block')}
            >
              <Link href="/register">Rejestracja</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
