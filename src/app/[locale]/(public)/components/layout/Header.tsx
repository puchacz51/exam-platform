'use client';

import Link from 'next/link';
import Image from 'next/image';

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
              <div className="flex items-center gap-2">
                <Image
                  src="/test.png"
                  alt="QuizSow"
                  width={32}
                  height={32}
                />
                QuizSow
              </div>
            </Link>
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
