import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
        ARTICLE NOT FOUND
      </h1>
      <p className="text-neutral-600 mb-6 max-w-lg">
        We couldn’t find the news or media article you’re looking for. It may
        have been moved or no longer exists.
      </p>
      <Link href="/news-media" className="text-accent-600 hover:underline">
        ← Back to News & Media
      </Link>
    </div>
  );
}
