'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewBoyfriendPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [book, setBook] = useState('');
  const [traits, setTraits] = useState('');
  const [greenFlags, setGreenFlags] = useState('');
  const [redFlags, setRedFlags] = useState('');
  const [survive, setSurvive] = useState('Maybe');
  const [notes, setNotes] = useState('');
  const [moments, setMoments] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    await supabase.from('book_boyfriends').insert({
      user_id: user.id,
      name,
      book,
      traits: traits ? traits.split(',').map((t) => t.trim()) : [],
      green_flags: greenFlags ? greenFlags.split(',').map((t) => t.trim()) : [],
      red_flags: redFlags ? redFlags.split(',').map((t) => t.trim()) : [],
      would_i_survive: survive,
      notes,
      favourite_moments: moments,
    });

    router.push('/book-boyfriends');
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-4xl font-serif">Add a Book Boyfriend</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Book / Series"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Traits (comma separated)"
          value={traits}
          onChange={(e) => setTraits(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Green Flags (comma separated)"
          value={greenFlags}
          onChange={(e) => setGreenFlags(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Red Flags (comma separated)"
          value={redFlags}
          onChange={(e) => setRedFlags(e.target.value)}
        />

        <select
          className="w-full border border-stone-300 rounded-lg p-2"
          value={survive}
          onChange={(e) => setSurvive(e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
          <option>Maybe</option>
          <option>I'd risk it anyway</option>
        </select>

        <textarea
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Why I love him / Notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <textarea
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Favourite moments"
          rows={3}
          value={moments}
          onChange={(e) => setMoments(e.target.value)}
        />

        <button
          type="submit"
          className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2"
        >
          Save Book Boyfriend
        </button>
      </form>
    </div>
  );
}
