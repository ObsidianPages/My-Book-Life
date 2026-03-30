'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';

type Author = {
  id: string;
  name: string;
  bio: string;
  favourite_books: string[];
  rating: number | null;
  image_url: string | null;
};

export default function AuthorDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const loadAuthor = async () => {
      const { data } = await supabase
        .from('authors')
        .select('*')
        .eq('id', id)
        .single();

      setAuthor(data as Author);
    };

    loadAuthor();
  }, [id]);

  if (!author) return <p>Loading...</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-stone-200 overflow-hidden" />
        <div>
          <h1 className="text-4xl font-serif">{author.name}</h1>
          {author.rating && (
            <p className="text-yellow-600 mt-1">⭐ {author.rating}</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-2">Bio</h2>
        <p className="text-stone-700 whitespace-pre-line">{author.bio}</p>
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-2">Favourite Books</h2>
        <ul className="list-disc list-inside text-stone-700">
          {author.favourite_books?.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
