import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import type { InvoiceForm, CustomerField } from "@/app/lib/definitions"; // import type

// 1. Schema
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const EditInvoice = FormSchema.omit({ date: true });

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// 2. Server action
export async function updateInvoice(id: string, formData: FormData) {
  "use server";

  const { customerId, amount, status } = EditInvoice.parse({
    id,
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// 3. Component EditInvoiceForm
export function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  return (
    <form action={updateInvoiceWithId}>
      <button type="submit">Update</button>
    </form>
  );
}
