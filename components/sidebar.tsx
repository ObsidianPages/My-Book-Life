import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="md:hidden fixed inset-0 z-50 bg-white dark:bg-stone-900 bg-opacity-100 dark:bg-opacity-100 p-6 space-y-4">
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
