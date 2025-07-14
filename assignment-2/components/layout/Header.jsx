import Link from "next/link";
import { Globe, History } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Globe className="h-6 w-6" />
            Blog Summariser
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <History className="h-4 w-4" />
              History
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
