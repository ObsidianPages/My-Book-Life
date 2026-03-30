export default function QuoteCard({
  quote,
  book,
  author,
  mood,
}: {
  quote: string;
  book: string;
  author: string;
  mood: string;
}) {
  return (
    <div className="rounded-xl bg-white border border-stone-200 shadow-sm p-4">
      <p className="italic">“{quote}”</p>

      <div className="mt-3 text-sm text-stone-600">
        — {author}, <span className="italic">{book}</span>
      </div>

      {mood && (
        <span className="inline-block mt-3 text-xs px-2 py-1 rounded-full bg-stone-100">
          {mood}
        </span>
      )}
    </div>
  );
}
