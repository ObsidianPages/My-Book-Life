'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SettingsPage() {
  const [dark, setDark] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    const newVal = !dark;
    setDark(newVal);

    if (newVal) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const uploadImage = async (e: any) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileName = `${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      setImageUrl(urlData.publicUrl);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-xl">
      <h1 className="text-4xl font-serif">Settings</h1>

      {/* Dark Mode */}
      <div>
        <h2 className="text-2xl font-serif mb-2">Appearance</h2>
        <button
          onClick={toggleDark}
          className="px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600"
        >
          {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      {/* Image Upload */}
      <div>
        <h2 className="text-2xl font-serif mb-2">Image Upload Test</h2>
        <input type="file" onChange={uploadImage} />

        {uploading && <p className="text-sm text-stone-500">Uploading...</p>}

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="mt-4 rounded-lg border border-stone-300 dark:border-stone-600"
          />
        )}
      </div>
    </div>
  );
}
