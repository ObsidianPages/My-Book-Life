'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  page_count: number;
  status: string;
  rating: number | null;
  started_at: string | null;
  finished_at: string | null;
};

export default function BookDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      const { data } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single();

      setBook(data as Book);
    };

    loadBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-4xl font-serif">{book.title}</h1>
      <p className="text-stone-600">{book.author}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Detail label="Genre" value={book.genre} />
        <Detail label="Pages" value={book.page_count} />
        <Detail label="Status" value={book.status} />
        <Detail label="Rating" value={book.rating ?? '—'} />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-serif mb-2">Notes</h2>
        <p className="text-stone-600">
          Notes, quotes, and aesthetics pages will link here later.
        </p>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
}
