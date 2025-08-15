"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "./pagination";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Table from "./table";

// ====== Search Component ======
function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      placeholder={placeholder}
      defaultValue={searchParams.get("query") || ""}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}

// ====== Main Page ======
export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold">Invoices</h1>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Search placeholder="Search invoices..." />
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={2} />
      </div>
    </div>
  );
}
