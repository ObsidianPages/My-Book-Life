'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Goals = {
  id: string;
  year: number;
  year_goal: number;
  monthly_goal: number;
  pages_per_day: number;
  custom_goals: string[];
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goals | null>(null);
  const [yearGoal, setYearGoal] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [pagesPerDay, setPagesPerDay] = useState('');
  const [customGoals, setCustomGoals] = useState('');
  const [booksReadThisYear, setBooksReadThisYear] = useState(0);
  const [booksReadThisMonth, setBooksReadThisMonth] = useState(0);

  useEffect(() => {
    const loadGoals = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      const { data } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setGoals(data as Goals);
        setYearGoal(data.year_goal?.toString() || '');
        setMonthlyGoal(data.monthly_goal?.toString() || '');
        setPagesPerDay(data.pages_per_day?.toString() || '');
        setCustomGoals((data.custom_goals || []).join(', '));
      }

      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;

      const { data: booksYear } = await supabase
        .from('books')
        .select('id, finished_at')
        .eq('user_id', user.id)
        .not('finished_at', 'is', null);

const yearCount =
  booksYear?.filter((b: { finished_at: string | null }) => {
    const d = new Date(b.finished_at as string);
    return d.getFullYear() === year;
  }).length || 0;

const monthCount =
  booksYear?.filter((b: { finished_at: string | null }) => {
    const d = new Date(b.finished_at as string);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  }).length || 0;

      setBooksReadThisYear(yearCount);
      setBooksReadThisMonth(monthCount);
    };

    loadGoals();
  }, []);

  const handleSave = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    await supabase.from('goals').upsert({
      user_id: user.id,
      year: new Date().getFullYear(),
      year_goal: yearGoal ? Number(yearGoal) : null,
      monthly_goal: monthlyGoal ? Number(monthlyGoal) : null,
      pages_per_day: pagesPerDay ? Number(pagesPerDay) : null,
      custom_goals: customGoals
        ? customGoals.split(',').map((g) => g.trim())
        : [],
    });

    alert('Goals updated');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-4xl font-serif">Reading Goals</h1>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif mb-2">Yearly Goal</h2>
          <input
            className="w-full border border-stone-300 rounded-lg p-2"
            placeholder="Books to read this year"
            type="number"
            value={yearGoal}
            onChange={(e) => setYearGoal(e.target.value)}
          />
          {goals?.year_goal && (
            <div className="mt-3 space-y-1">
              <p className="text-sm text-stone-600">
                {booksReadThisYear} / {goals.year_goal} books
              </p>
              <ProgressBar value={booksReadThisYear} max={goals.year_goal} />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-serif mb-2">Monthly Goal</h2>
          <input
            className="w-full border border-stone-300 rounded-lg p-2"
            placeholder="Books per month"
            type="number"
            value={monthlyGoal}
            onChange={(e) => setMonthlyGoal(e.target.value)}
          />
          {goals?.monthly_goal && (
            <div className="mt-3 space-y-1">
              <p className="text-sm text-stone-600">
                {booksReadThisMonth} / {goals.monthly_goal} books this month
              </p>
              <ProgressBar
                value={booksReadThisMonth}
                max={goals.monthly_goal}
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-serif mb-2">Pages Per Day</h2>
          <input
            className="w-full border border-stone-300 rounded-lg p-2"
            placeholder="Pages per day"
            type="number"
            value={pagesPerDay}
            onChange={(e) => setPagesPerDay(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-2xl font-serif mb-2">Custom Goals</h2>
          <input
            className="w-full border border-stone-300 rounded-lg p-2"
            placeholder="e.g., read more fantasy, finish series (comma separated)"
            value={customGoals}
            onChange={(e) => setCustomGoals(e.target.value)}
          />
        </div>
      </section>

      <button
        onClick={handleSave}
        className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2"
      >
        Save Goals
      </button>
    </div>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div className="w-full h-3 bg-stone-200 dark:bg-stone-700 rounded-full">
      <div
        className="h-3 bg-stone-900 dark:bg-stone-100 rounded-full"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
