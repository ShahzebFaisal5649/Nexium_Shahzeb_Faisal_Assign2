import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "History", href: "/history" },
];

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="flex space-x-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            router.pathname === item.href
              ? "border-indigo-500 text-gray-900"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            "whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
