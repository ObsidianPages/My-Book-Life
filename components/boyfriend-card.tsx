import Link from 'next/link';

export default function BoyfriendCard({
  id,
  name,
  book,
  traits,
}: {
  id: string;
  name: string;
  book: string;
  traits: string[];
}) {
  return (
    <Link
      href={`/book-boyfriends/${id}`}
      className="rounded-xl bg-white border border-stone-200 shadow-sm p-4 hover:shadow-md transition"
    >
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-stone-500">{book}</p>

      <div className="flex flex-wrap gap-1 mt-2">
        {traits.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-700"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
