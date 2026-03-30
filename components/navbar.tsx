'use client';

import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    const newVal = !dark;
    setDark(newVal);

    if (newVal) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <>
      <nav className="w-full border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 py-3 px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-serif">
          My Book Life
        </Link>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleDark}
            className="px-3 py-1 rounded-lg border border-stone-300 dark:border-stone-600 text-xs"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
          <button onClick={() => setOpen(!open)} className="text-2xl">
            ☰
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-stone-900 bg-opacity-100 dark:bg-opacity-100 p-6 space-y-4">
    <div className="flex justify-between items-center mb-4">
      <span className="text-lg font-serif">Menu</span>
      <button onClick={() => setOpen(false)} className="text-2xl">
        ×
      </button>
    </div>

    <MobileLink href="/dashboard" onClick={() => setOpen(false)}>
      Dashboard
    </MobileLink>
    <MobileLink href="/books" onClick={() => setOpen(false)}>
      Books
    </MobileLink>
    <MobileLink href="/authors" onClick={() => setOpen(false)}>
      Authors
    </MobileLink>
    <MobileLink href="/book-boyfriends" onClick={() => setOpen(false)}>
      Book Boyfriends
    </MobileLink>
    <MobileLink href="/quotes" onClick={() => setOpen(false)}>
      Quotes
    </MobileLink>
    <MobileLink href="/aesthetics" onClick={() => setOpen(false)}>
      Aesthetics
    </MobileLink>
    <MobileLink href="/goals" onClick={() => setOpen(false)}>
      Goals
    </MobileLink>
    <MobileLink href="/settings" onClick={() => setOpen(false)}>
      Settings
    </MobileLink>

    <button
      onClick={() => {
        setOpen(false);
        logout();
      }}
      className="text-red-600 underline mt-4"
    >
      Logout
    </button>
  </div>
      )}
    </>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <a href={href} onClick={onClick} className="block text-lg">
      {children}
    </a>
  );
}
