"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center p-4 bg-gray-500">
      <h1 className="text-2xl font-bold">Notification Manager</h1>
      <nav className="flex gap-4">
        <Link href="/" className={IsActive("/", pathname)}>
          Accueil
        </Link>
        <Link
          href="/notification-manager"
          className={IsActive("/notification-manager", pathname)}
        >
          Manager
        </Link>
      </nav>
    </header>
  );
}

const IsActive = (href: string, pathname: string) => {
  if (pathname === href) {
    return "bg-gray-700 text-white";
  }
  return "text-gray-300 hover:bg-gray-700 hover:text-white";
};
