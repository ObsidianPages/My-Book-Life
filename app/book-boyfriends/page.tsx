'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import BoyfriendCard from '@/components/boyfriend-card';

type Boyfriend = {
  id: string;
  name: string;
  book: string;
  traits: string[];
};

export default function BookBoyfriendsPage() {
  const [items, setItems] = useState<Boyfriend[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      const { data } = await supabase
        .from('book_boyfriends')
        .select('id, name, book, traits')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setItems((data as Boyfriend[]) || []);
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/public/boyfriend.jpg')" }}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-serif">Book Boyfriend Files</h1>
        <Link
          href="/book-boyfriends/new"
          className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2 text-sm"
        >
          Add Book Boyfriend
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((b) => (
          <BoyfriendCard
            key={b.id}
            id={b.id}
            name={b.name}
            book={b.book}
            traits={b.traits || []}
          />
        ))}
      </div>
    </div>
  );
}
