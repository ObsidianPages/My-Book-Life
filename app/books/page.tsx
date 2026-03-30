'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import BookCard from '@/components/book-card';

type Book = {
  id: string;
  title: string;
  author: string;
  status: string;
  rating: number | null;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      const { data } = await supabase
        .from('books')
        .select('id, title, author, status, rating')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setBooks((data as Book[]) || []);
    };

    loadBooks();
  }, []);

  const filtered = books.filter((b) =>
    [b.title, b.author, b.status]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/public/books.jpg')" }}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-serif">My Books</h1>
        <Link
          href="/books/new"
          className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2 text-sm"
        >
          Add Book
        </Link>
      </div>

      <input
        className="w-full border border-stone-300 rounded-lg p-2"
        placeholder="Search by title, author, or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <BookCard
            key={b.id}
            id={b.id}
            title={b.title}
            author={b.author}
            status={b.status}
            rating={b.rating}
          />
        ))}
      </div>
    </div>
  );
}
