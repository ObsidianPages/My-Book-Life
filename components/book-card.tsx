import Link from 'next/link';

export default function BookCard({
  id,
  title,
  author,
  status,
  rating,
}: {
  id: string;
  title: string;
  author: string;
  status: string;
  rating: number | null;
}) {
  return (
    <Link
      href={`/books/${id}`}
      className="rounded-xl bg-white border border-stone-200 shadow-sm p-4 hover:shadow-md transition"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-stone-500">{author}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs px-2 py-1 rounded-full bg-stone-100">
          {status}
        </span>

        {rating && (
          <span className="text-sm font-medium text-yellow-600">
            ⭐ {rating}
          </span>
        )}
      </div>
    </Link>
  );
}
