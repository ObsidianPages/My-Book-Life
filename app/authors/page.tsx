'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

type Author = {
  id: string;
  name: string;
  image_url: string | null;
  rating: number | null;
};

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadAuthors = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      const { data } = await supabase
        .from('authors')
        .select('id, name, image_url, rating')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setAuthors((data as Author[]) || []);
    };

    loadAuthors();
  }, []);

  const filtered = authors.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/author.jpg')" }}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-serif">Authors</h1>
        <Link
          href="/authors/new"
          className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2 text-sm"
        >
          Add Author
        </Link>
      </div>

      <input
        className="w-full border border-stone-300 rounded-lg p-2"
        placeholder="Search authors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link
            key={a.id}
            href={`/authors/${a.id}`}
            className="rounded-xl bg-white border border-stone-200 shadow-sm p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-stone-100 overflow-hidden" />
              <div>
                <p className="font-semibold">{a.name}</p>
                {a.rating && (
                  <p className="text-xs text-yellow-600">⭐ {a.rating}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
