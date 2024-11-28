'use client';

import Link from 'next/link';

import ProfileDropdown from '@/app/[locale]/components/header/ProfileDropdown';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
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
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-900"
              >
                Strona główna
              </Link>
              <Link
                href="/about"
                className="text-gray-500 hover:text-gray-900"
              >
                O nas
              </Link>
              <Link
                href="/contact"
                className="text-gray-500 hover:text-gray-900"
              >
                Kontakt
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {children}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
