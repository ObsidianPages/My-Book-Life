'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import StatCard from '@/components/stat-card';

type Stats = {
  booksThisYear: number;
  pagesRead: number;
  avgRating: number | null;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      const { data: books } = await supabase
        .from('books')
        .select('*')
        .eq('user_id', user.id);

      if (!books) return;

      const thisYear = new Date().getFullYear();
      const finishedThisYear = books.filter(
        (b: any) =>
          b.status === 'finished' &&
          b.finished_at &&
          new Date(b.finished_at).getFullYear() === thisYear
      );

      const pagesRead = finishedThisYear.reduce(
        (sum: number, b: any) => sum + (b.page_count || 0),
        0
      );

      const ratings = finishedThisYear
        .map((b: any) => b.rating)
        .filter((r: number | null) => r != null);

      const avgRating =
        ratings.length > 0
          ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
          : null;

      setStats({
        booksThisYear: finishedThisYear.length,
        pagesRead,
        avgRating,
      });
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-serif">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Books read this year"
          value={stats?.booksThisYear ?? '—'}
        />
        <StatCard label="Pages read" value={stats?.pagesRead ?? '—'} />
        <StatCard
          label="Average rating"
          value={stats?.avgRating ? stats.avgRating.toFixed(1) : '—'}
        />
      </div>
    </div>
  );
}
