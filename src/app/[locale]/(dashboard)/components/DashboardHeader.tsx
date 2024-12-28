'use client';

import Link from 'next/link';

import ProfileDropdown from '@/app/[locale]/components/header/ProfileDropdown';
import LanguageSwitcher from '@/app/[locale]/components/LanguageSwitcher';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-xl font-bold text-gray-900 transition-colors hover:text-gray-700 sm:text-2xl"
            >
              Dashboard
            </Link>
          </div>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <LanguageSwitcher />

            <ProfileDropdown />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
