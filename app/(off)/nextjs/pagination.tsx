"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`rounded border px-3 py-1 ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
