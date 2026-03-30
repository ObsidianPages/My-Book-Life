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
        setYearGoal(data.year_goal || '');
        setMonthlyGoal(data.monthly_goal || '');
        setPagesPerDay(data.pages_per_day || '');
        setCustomGoals((data.custom_goals || []).join(', '));
      }
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

      {/* Yearly Goal */}
      <div>
        <h2 className="text-2xl font-serif mb-2">Yearly Goal</h2>
        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Books to read this year"
          type="number"
          value={yearGoal}
          onChange={(e) => setYearGoal(e.target.value)}
        />
      </div>

      {/* Monthly Goal */}
      <div>
        <h2 className="text-2xl font-serif mb-2">Monthly Goal</h2>
        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Books per month"
          type="number"
          value={monthlyGoal}
          onChange={(e) => setMonthlyGoal(e.target.value)}
        />
      </div>

      {/* Pages per day */}
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

      {/* Custom Goals */}
      <div>
        <h2 className="text-2xl font-serif mb-2">Custom Goals</h2>
        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="e.g., read more fantasy, finish series (comma separated)"
          value={customGoals}
          onChange={(e) => setCustomGoals(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        className="rounded-lg bg-stone-900 text-stone-50 px-4 py-2"
      >
        Save Goals
      </button>
    </div>
  );
}
