import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { TrashIcon } from "@heroicons/react/24/outline";

// 1. Connect Postgres
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// 2. Server action
export async function deleteInvoice(id: string) {
  "use server";

  if (!id) return;

  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// 3. Reusable DeleteInvoice component
export function Example({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit">Delete</button>
    </form>
  );
}
