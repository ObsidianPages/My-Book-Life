import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-stone-200 bg-white py-3 px-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-serif">
        Cozy Reader Hub
      </Link>

      <div className="flex gap-4 text-sm">
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
          Boyfriends
        </Link>
        <Link href="/quotes" className="hover:underline">
          Quotes
        </Link>
        <Link href="/goals" className="hover:underline">
          Goals
        </Link>
      </div>
    </nav>
  );
}
