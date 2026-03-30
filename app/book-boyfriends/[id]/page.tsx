'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';

type Boyfriend = {
  id: string;
  name: string;
  book: string;
  traits: string[];
  green_flags: string[];
  red_flags: string[];
  would_i_survive: string;
  notes: string;
  favourite_moments: string;
};

export default function BoyfriendDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [bf, setBf] = useState<Boyfriend | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('book_boyfriends')
        .select('*')
        .eq('id', id)
        .single();

      setBf(data as Boyfriend);
    };

    load();
  }, [id]);

  if (!bf) return <p>Loading...</p>;

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-4xl font-serif">{bf.name}</h1>
        <p className="text-stone-600">{bf.book}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {bf.traits?.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FlagCard title="Green Flags" items={bf.green_flags} color="green" />
        <FlagCard title="Red Flags" items={bf.red_flags} color="red" />
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-2">Would I Survive Him?</h2>
        <p className="text-lg font-medium">{bf.would_i_survive}</p>
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-2">Favourite Moments</h2>
        <p className="text-stone-700 whitespace-pre-line">
          {bf.favourite_moments}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-2">Notes</h2>
        <p className="text-stone-700 whitespace-pre-line">{bf.notes}</p>
      </div>
    </div>
  );
}

function FlagCard({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: 'green' | 'red';
}) {
  const bg = color === 'green' ? 'bg-green-50' : 'bg-red-50';
  const border = color === 'green' ? 'border-green-200' : 'border-red-200';

  return (
    <div className={`rounded-xl border ${border} ${bg} p-4`}>
      <h3 className="text-xl font-serif mb-2">{title}</h3>
      <ul className="list-disc list-inside text-stone-700">
        {items?.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
