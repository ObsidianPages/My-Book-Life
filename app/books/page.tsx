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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-serif">My Books</h1>
        <Link
          href="/books/new"
          className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2 text-sm"
        >
          Add Book
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((b) => (
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
