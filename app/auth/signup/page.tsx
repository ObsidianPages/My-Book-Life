'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-4xl font-serif">Create Account</h1>

      {errorMsg && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-stone-900 text-stone-50 px-4 py-2"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-stone-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
