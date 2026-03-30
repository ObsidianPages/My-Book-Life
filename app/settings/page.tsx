'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ImageUploader from '@/components/image-uploader';

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const init = async () => {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        setDark(true);
      }

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data);
        setUsername(data.username || '');
      } else {
        setProfile({ id: user.id });
      }
    };

    init();
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

  const save = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    await supabase.from('profiles').upsert({
      id: user.id,
      username,
    });

    alert('Saved');
  };

  return (
    <div className="space-y-8 max-w-xl">
      <h1 className="text-4xl font-serif">Settings</h1>

      <div>
        <h2 className="text-2xl font-serif mb-2">Appearance</h2>
        <button
          onClick={toggleDark}
          className="px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600"
        >
          {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-2">Avatar</h2>

        {profile?.avatar_url && (
          <img
            src={profile.avatar_url}
            className="w-24 h-24 rounded-full object-cover border border-stone-300 dark:border-stone-600 mb-3"
          />
        )}

        <ImageUploader
          onUpload={async (url) => {
            if (!profile) return;
            await supabase
              .from('profiles')
              .upsert({ id: profile.id, avatar_url: url, username });

            setProfile({ ...profile, avatar_url: url });
          }}
        />
      </div>

      <div>
        <h2 className="text-2xl font-serif mb-2">Username</h2>
        <input
          className="w-full border border-stone-300 dark:border-stone-600 rounded-lg p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <button
        onClick={save}
        className="px-4 py-2 bg-stone-900 text-stone-50 rounded-lg"
      >
        Save
      </button>
    </div>
  );
}
