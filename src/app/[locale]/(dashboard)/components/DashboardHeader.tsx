'use client';

import Link from 'next/link';
import { Bell, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ProfileDropdown from '@/app/[locale]/components/header/ProfileDropdown';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-2xl font-bold text-gray-900"
            >
              Dashboard
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <ProfileDropdown />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
