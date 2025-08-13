"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="flex gap-6 bg-gray-100 p-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`hover:underline ${
            pathname === link.href ? "font-bold text-blue-600" : "text-gray-700"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
