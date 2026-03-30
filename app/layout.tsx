import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Cozy Reader Hub',
  description: 'An aesthetic reading tracker for book lovers',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <main className="max-w-5xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
