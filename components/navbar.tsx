'use client';

import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [dark, setDark] = useState(false);

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
    <nav className="w-full border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 py-3 px-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-serif">
        Cozy Reader Hub
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/books" className="hover:underline">Books</Link>
        <Link href="/authors" className="hover:underline">Authors</Link>
        <Link href="/book-boyfriends" className="hover:underline">Boyfriends</Link>
        <Link href="/quotes" className="hover:underline">Quotes</Link>
        <Link href="/goals" className="hover:underline">Goals</Link>
        <Link href="/settings" className="hover:underline">Settings</Link>

        <button
          onClick={toggleDark}
          className="px-3 py-1 rounded-lg border border-stone-300 dark:border-stone-600"
        >
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>

        <button
          onClick={logout}
          className="text-red-600 dark:text-red-400 underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
