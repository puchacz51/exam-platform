'use client';

import { usePathname } from 'next/navigation';
import { BarChart, FileText, Home, LucideProps, Users } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Pathname } from '@/i18n/pathnames';
import { Link } from '@/i18n/routing';
import {
  ForwardRefExoticComponent,
  ReactComponentElement,
  ReactElement,
  RefAttributes,
} from 'react';

interface NavItem {
  href: Pathname;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/groups', icon: Users, label: 'Users' },
  { href: '/test/assign', icon: FileText, label: 'Reports' },
];

const DashboardNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1 bg-gray-100 p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href as '/dashboard'}
          className={cn(
            'flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900',
            pathname === item.href && 'bg-gray-200 text-gray-900'
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNavbar;
