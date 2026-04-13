'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, CalendarClock, ClipboardList, Gauge, Handshake, Receipt } from 'lucide-react';
import clsx from 'clsx';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: Gauge },
  { href: '/clients', label: 'Clients', icon: Building2 },
  { href: '/visits', label: 'Visites', icon: Handshake },
  { href: '/relances', label: 'Relances', icon: CalendarClock },
  { href: '/devis', label: 'Devis', icon: Receipt }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b bg-white md:min-h-screen md:border-b-0 md:border-r">
      <div className="flex items-center gap-2 border-b p-4">
        <ClipboardList className="h-5 w-5 text-brand" />
        <div>
          <p className="text-sm font-semibold">CRM Terrain</p>
          <p className="text-xs text-slate-500">Commercial personnel</p>
        </div>
      </div>
      <nav className="grid grid-cols-2 gap-2 p-3 md:grid-cols-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition',
              pathname.startsWith(href) ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
