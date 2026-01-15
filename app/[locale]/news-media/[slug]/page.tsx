// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { getNewsBySlug, getNewsItems } from "@/lib/data/news";

// // Simple markdown renderer for headings, paragraphs, and lists
// function renderMarkdown(markdown: string) {
//   const lines = markdown.split("\n");
//   const elements: React.ReactNode[] = [];
//   let listBuffer: string[] = [];

//   const flushList = () => {
//     if (listBuffer.length > 0) {
//       elements.push(
//         <ul className="list-disc pl-6 space-y-1" key={`ul-${elements.length}`}>
//           {listBuffer.map((item, idx) => (
//             <li key={idx}>{item.replace(/^[-*]\s?/, "")}</li>
//           ))}
//         </ul>
//       );
//       listBuffer = [];
//     }
//   };

//   for (const line of lines) {
//     if (/^\s*$/.test(line)) {
//       flushList();
//       elements.push(<div className="h-2" key={`sp-${elements.length}`} />);
//       continue;
//     }
//     if (/^###\s+/.test(line)) {
//       flushList();
//       elements.push(
//         <h3
//           className="text-xl font-semibold mt-6"
//           key={`h3-${elements.length}`}
//         >
//           {line.replace(/^###\s+/, "")}
//         </h3>
//       );
//       continue;
//     }
//     if (/^##\s+/.test(line)) {
//       flushList();
//       elements.push(
//         <h2
//           className="text-2xl font-semibold mt-8"
//           key={`h2-${elements.length}`}
//         >
//           {line.replace(/^##\s+/, "")}
//         </h2>
//       );
//       continue;
//     }
//     if (/^#\s+/.test(line)) {
//       flushList();
//       elements.push(
//         <h1 className="text-3xl font-bold mt-10" key={`h1-${elements.length}`}>
//           {line.replace(/^#\s+/, "")}
//         </h1>
//       );
//       continue;
//     }
//     if (/^[-*]\s+/.test(line)) {
//       listBuffer.push(line);
//       continue;
//     }
//     elements.push(
//       <p className="text-neutral-700 leading-7" key={`p-${elements.length}`}>
//         {line}
//       </p>
//     );
//   }
//   flushList();
//   return elements;
// }

// export async function generateStaticParams() {
//   // Generate params for both locales
//   const enItems = getNewsItems("en");
//   const zhItems = getNewsItems("zh");

//   const enParams = enItems.map((n) => ({ slug: n.slug }));
//   const zhParams = zhItems.map((n) => ({ slug: n.slug }));

//   // Combine and deduplicate by slug
//   const allSlugs = [...new Set([...enParams, ...zhParams].map((p) => p.slug))];
//   return allSlugs.map((slug) => ({ slug }));
// }

// interface PageProps {
//   params: Promise<{ slug: string; locale: string }>;
// }

// export default async function NewsDetailPage({ params }: PageProps) {
//   const { slug, locale } = await params;
//   const news = getNewsBySlug(slug, locale);
//   if (!news) return notFound();

//   const formattedDate = new Date(news.date).toLocaleDateString(
//     locale === "zh" ? "zh-CN" : "en-US",
//     {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }
//   );

//   return (
//     <div className="min-h-screen bg-white mt-40">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="mb-6 text-sm">
//           <Link
//             href={`/${locale}/news-media`}
//             className="text-accent-600 hover:underline"
//           >
//             ← {locale === "zh" ? "返回新闻媒体" : "Back to News & Media"}
//           </Link>
//         </div>

//         <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
//           {news.title}
//         </h1>
//         <div className="text-neutral-500 mb-8">
//           <span>{formattedDate}</span>
//           <span className="mx-2">•</span>
//           <span>By {news.author}</span>
//           <span className="mx-2">•</span>
//           <span className="capitalize">{news.category}</span>
//         </div>

//         {news.image && (
//           <div className="relative w-full h-64 md:h-96 mb-10 overflow-hidden ">
//             <Image
//               src={news.image}
//               alt={news.title}
//               fill
//               className="object-cover"
//               sizes="(max-width: 768px) 100vw, 768px"
//               priority
//             />
//           </div>
//         )}

//         <div className="prose prose-neutral max-w-none">
//           {renderMarkdown(news.content)}
//         </div>
//       </div>
//     </div>
//   );
// }
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getNewsBySlug, getNewsItems } from "@/lib/data/news";
import { Metadata } from "next";

// Enhanced markdown renderer with image support
function renderMarkdown(markdown: string, contentImages?: string[]) {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul
          className="list-disc pl-6 space-y-1"
          key={`ul-${elements.length}`}
        >
          {listBuffer.map((item, idx) => (
            <li key={idx}>{item.replace(/^[-*]\s?/, "")}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  for (const line of lines) {
    // Handle empty lines
    if (/^\s*$/.test(line)) {
      flushList();
      elements.push(<div className="h-2" key={`sp-${elements.length}`} />);
      continue;
    }

    // Handle image placeholders [IMAGE:0], [IMAGE:1], etc.
    const imageMatch = line.match(/^\[IMAGE:(\d+)\]$/);
    if (imageMatch && contentImages) {
      flushList();
      const imageIndex = parseInt(imageMatch[1]);
      if (imageIndex < contentImages.length) {
        elements.push(
          <div
            className="relative w-full h-64 md:h-96 mb-10 overflow-hidden"
            key={`img-${elements.length}`}
          >
            <Image
              src={contentImages[imageIndex]}
              alt={`Content image ${imageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        );
      }
      continue;
    }

    // Handle headings - changed ### to h3, ## to h2, removed # (h1)
    if (/^###\s+/.test(line)) {
      flushList();
      elements.push(
        <h3
          className="text-xl font-semibold mt-6"
          key={`h3-${elements.length}`}
        >
          {line.replace(/^###\s+/, "")}
        </h3>
      );
      continue;
    }
    if (/^##\s+/.test(line)) {
      flushList();
      elements.push(
        <h2
          className="text-2xl font-semibold mt-8"
          key={`h2-${elements.length}`}
        >
          {line.replace(/^##\s+/, "")}
        </h2>
      );
      continue;
    }

    // Handle list items
    if (/^[-*]\s+/.test(line)) {
      listBuffer.push(line);
      continue;
    }

    // Handle paragraphs
    flushList();
    elements.push(
      <p
        className="text-neutral-700 leading-7"
        key={`p-${elements.length}`}
      >
        {line}
      </p>
    );
  }

  flushList();
  return elements;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const news = getNewsBySlug(slug, locale);

  if (!news) {
    return {
      title: "Article Not Found | YIGO Group",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: news.metaTitle || news.title,
    description: news.metaDescription || news.excerpt,
    alternates: {
      canonical: `https://yigogroup.ae/${locale}/news-media/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const enItems = getNewsItems("en");
  const zhItems = getNewsItems("zh");

  const enParams = enItems.map((n) => ({ slug: n.slug }));
  const zhParams = zhItems.map((n) => ({ slug: n.slug }));

  const allSlugs = [...new Set([...enParams, ...zhParams].map((p) => p.slug))];
  return allSlugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const news = getNewsBySlug(slug, locale);
  if (!news) return notFound();

  const formattedDate = new Date(news.date).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-white mt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link
            href={`/${locale}/news-media`}
            className="text-accent-600 hover:underline"
          >
            ← {locale === "zh" ? "返回新闻媒体" : "Back to News & Media"}
          </Link>
        </div>

        {/* Article Header - ONLY H1 on the page */}
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          {news.title}
        </h1>
        <div className="text-neutral-500 mb-8">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>By {news.author}</span>
          <span className="mx-2">•</span>
          <span className="capitalize">{news.category}</span>
        </div>

        {/* Featured Banner Image */}
        {news.image && (
          <div className="relative w-full h-64 md:h-96 mb-10 overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-neutral max-w-none">
          {renderMarkdown(news.content, news.contentImages)}
        </div>
      </div>
    </div>
  );
}