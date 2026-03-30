'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewQuotePage() {
  const router = useRouter();

  const [quote, setQuote] = useState('');
  const [book, setBook] = useState('');
  const [author, setAuthor] = useState('');
  const [page, setPage] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    await supabase.from('quotes').insert({
      user_id: user.id,
      quote,
      book,
      author,
      page: page ? Number(page) : null,
      mood,
    });

    router.push('/quotes');
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-4xl font-serif">Add a Quote</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Quote text"
          rows={3}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Book"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Page number"
          type="number"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Mood (e.g., romantic, sad, cozy)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        <button
          type="submit"
          className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2"
        >
          Save Quote
        </button>
      </form>
    </div>
  );
}
