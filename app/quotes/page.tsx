'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import QuoteCard from '@/components/quote-card';
import Link from 'next/link';

type Quote = {
  id: string;
  quote: string;
  book: string;
  author: string;
  mood: string;
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loadQuotes = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      const { data } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setQuotes((data as Quote[]) || []);
    };

    loadQuotes();
  }, []);

  const filteredQuotes = quotes.filter((q) =>
    filter
      ? q.book.toLowerCase().includes(filter.toLowerCase()) ||
        q.author.toLowerCase().includes(filter.toLowerCase()) ||
        q.mood.toLowerCase().includes(filter.toLowerCase())
      : true
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-serif">Favourite Quotes</h1>
        <Link
          href="/quotes/new"
          className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2 text-sm"
        >
          Add Quote
        </Link>
      </div>

      <input
        className="w-full border border-stone-300 rounded-lg p-2"
        placeholder="Filter by book, author, or mood..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredQuotes.map((q) => (
          <QuoteCard
            key={q.id}
            quote={q.quote}
            book={q.book}
            author={q.author}
            mood={q.mood}
          />
        ))}
      </div>
    </div>
  );
}
