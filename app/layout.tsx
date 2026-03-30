import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'My Book Life',
  description: 'An aesthetic reading tracker for book lovers',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors">
        <Navbar />
        <div className="flex">
       </div>
      </body>
    </html>
  );
}
