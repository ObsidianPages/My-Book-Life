'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';

type Aesthetic = {
  id: string;
  images: string[];
  mood_tags: string[];
  description: string;
  palette: string[];
  book_title: string;
};

export default function AestheticDetailPage() {
  const params = useParams();
  const bookId = params.bookId as string;

  const [aesthetic, setAesthetic] = useState<Aesthetic | null>(null);
  const [moodTags, setMoodTags] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('aesthetics')
        .select('*, books(title)')
        .eq('book_id', bookId)
        .single();

      if (data) {
        setAesthetic({
          id: data.id,
          images: data.images || [],
          mood_tags: data.mood_tags || [],
          description: data.description || '',
          palette: data.palette || [],
          book_title: data.books?.title || 'Untitled',
        });
      }
    };

    load();
  }, [bookId]);

  const handleSave = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    await supabase
      .from('aesthetics')
      .upsert({
        user_id: user.id,
        book_id: bookId,
        mood_tags: moodTags ? moodTags.split(',').map((t) => t.trim()) : [],
        description,
      });

    alert('Aesthetics updated');
  };

  if (!aesthetic) return <p>Loading...</p>;

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-4xl font-serif">{aesthetic.book_title} — Aesthetics</h1>

      <div>
        <h2 className="text-2xl font-serif mb-2">Moodboard</h2>
        <div className="grid grid-cols-3 gap-2">
          {aesthetic.images?.map((img, i) => (
            <div
              key={i}
              className="h-28 w-full bg-stone-200 rounded-lg overflow-hidden"
            />
          ))}
        </div>
        <p className="text-sm text-stone-500 mt-2">
          (Image uploads can be added later — this is the placeholder grid.)
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-2">Mood Tags</h2>
        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="e.g., dark academia, cozy, romantic"
          value={moodTags}
          onChange={(e) => setMoodTags(e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-2">Vibe Description</h2>
        <textarea
          className="w-full border border-stone-300 rounded-lg p-2"
          rows={4}
          placeholder="Describe the vibe of this book..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2"
      >
        Save Aesthetics
      </button>
    </div>
  );
}
