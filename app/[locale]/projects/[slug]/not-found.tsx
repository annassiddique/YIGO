import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <Image
            src="/images/logo.svg"
            alt="YIGO Logo"
            width={120}
            height={40}
            className="h-14 w-auto mx-auto"
          />
        </div>
        <h1 className="font-heading text-6xl font-bold text-neutral-900 mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl font-semibold text-neutral-700 mb-4">
          PROJECT NOT FOUND
        </h2>
        <p className="text-neutral-600 mb-8">
          The project you&#39;re looking for doesn&#39;t exist or has been
          moved.
        </p>
        <div className="space-y-4">
          <Link href="/projects">
            <Button className="w-full">View All Projects</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
