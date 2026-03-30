'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewAuthorPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [favouriteBooks, setFavouriteBooks] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    await supabase.from('authors').insert({
      user_id: user.id,
      name,
      bio,
      favourite_books: favouriteBooks
        ? favouriteBooks.split(',').map((b) => b.trim())
        : [],
      rating: rating ? Number(rating) : null,
    });

    router.push('/authors');
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-4xl font-serif">Add an Author</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Author name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Bio"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Favourite books (comma separated)"
          value={favouriteBooks}
          onChange={(e) => setFavouriteBooks(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Rating (1–5)"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button
          type="submit"
          className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2"
        >
          Save Author
        </button>
      </form>
    </div>
  );
}
