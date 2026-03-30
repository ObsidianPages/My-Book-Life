'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewBookPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [status, setStatus] = useState('to_read');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    await supabase.from('books').insert({
      user_id: user.id,
      title,
      author,
      genre,
      page_count: Number(pageCount),
      status,
    });

    router.push('/books');
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-4xl font-serif">Add a Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Page count"
          type="number"
          value={pageCount}
          onChange={(e) => setPageCount(e.target.value)}
        />

        <select
          className="w-full border border-stone-300 rounded-lg p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="to_read">To Read</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2"
        >
          Save Book
        </button>
      </form>
    </div>
  );
}
