'use client';

import Link from 'next/link';
import { Bell, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ProfileDropdown from '@/app/[locale]/components/header/ProfileDropdown';

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
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
            >
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <ProfileDropdown />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
