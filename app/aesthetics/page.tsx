'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

type Aesthetic = {
  id: string;
  book_id: string;
  images: string[];
  mood_tags: string[];
  book_title: string;
};

export default function AestheticsPage() {
  const [items, setItems] = useState<Aesthetic[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      const { data } = await supabase
        .from('aesthetics')
        .select('id, book_id, images, mood_tags, books(title)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      const formatted = (data || []).map((item: any) => ({
        id: item.id,
        book_id: item.book_id,
        images: item.images || [],
        mood_tags: item.mood_tags || [],
        book_title: item.books?.title || 'Untitled',
      }));

      setItems(formatted);
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-serif">Book Aesthetics</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <Link
            key={a.id}
            href={`/aesthetics/${a.book_id}`}
            className="rounded-xl bg-white border border-stone-200 shadow-sm p-4 hover:shadow-md transition"
          >
            <h3 className="font-semibold mb-2">{a.book_title}</h3>

            <div className="grid grid-cols-3 gap-1 mb-3">
              {a.images?.slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  className="h-20 w-full bg-stone-200 rounded-lg overflow-hidden"
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-1">
              {a.mood_tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
