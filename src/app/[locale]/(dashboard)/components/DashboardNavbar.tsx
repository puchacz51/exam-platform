'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, FileText, Home, Users } from 'lucide-react';

import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/users', icon: Users, label: 'Users' },
  { href: '/dashboard/reports', icon: FileText, label: 'Reports' },
  { href: '/dashboard/analytics', icon: BarChart, label: 'Analytics' },
];

const DashboardNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1 bg-gray-100 p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
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
