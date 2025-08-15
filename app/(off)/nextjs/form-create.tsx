import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

// 1. Define full schema
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

// 2. Create schema without id & date
const CreateInvoice = FormSchema.omit({ id: true, date: true });
// 3. Connect Postgres
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// 4. Server action
export async function createInvoice(formData: FormData) {
  // 4.1 Parse & validate form
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  // 4.2 Convert to cents
  const amountInCents = amount * 100;
  // 4.3 Format date YYYY-MM-DD
  const date = new Date().toISOString().split("T")[0];
  // 4.4 Insert to DB
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  // 4.5 Revalidate cache
  revalidatePath("/dashboard/invoices");
  // 4.6 Redirect
  redirect("/dashboard/invoices");
}

export default function Example() {
  return (
    <>
      <form action={createInvoice}>
        <button type="submit">Create Invoice</button>
      </form>
    </>
  );
}
