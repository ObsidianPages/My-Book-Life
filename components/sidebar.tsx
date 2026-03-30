import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 border-r border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-4 gap-3">
      <h2 className="text-xl font-serif mb-2">Menu</h2>

      <Link href="/dashboard" className="hover:underline">
        Dashboard
      </Link>
      <Link href="/books" className="hover:underline">
        Books
      </Link>
      <Link href="/authors" className="hover:underline">
        Authors
      </Link>
      <Link href="/book-boyfriends" className="hover:underline">
        Book Boyfriends
      </Link>
      <Link href="/quotes" className="hover:underline">
        Quotes
      </Link>
      <Link href="/aesthetics" className="hover:underline">
        Aesthetics
      </Link>
      <Link href="/goals" className="hover:underline">
        Goals
      </Link>
      <Link href="/settings" className="hover:underline">
        Settings
      </Link>
    </aside>
  );
}
