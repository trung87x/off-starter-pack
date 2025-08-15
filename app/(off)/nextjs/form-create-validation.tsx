"use client";

import { z } from "zod";
import { useActionState } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

// 1. Schema đầy đủ
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string().min(1, "Name required"),
  amount: z.coerce.number().min(1, "Invalid amount"),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

// 2. Schema cho create (bỏ id & date)
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// 3. Kết nối DB
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// 4. Kiểu State cho form
type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// 5. Server Action kèm prevState
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate dữ liệu
  const parsed = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = parsed.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (err) {
    console.error("DB Error:", err);
    return { message: "Database Error: Failed to Create Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// 6. Component form
export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* Customer */}
      <div>
        <label htmlFor="customerId">Customer ID</label>
        <input
          id="customerId"
          name="customerId"
          className="block w-full rounded border p-2"
          aria-describedby="customer-error"
        />
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.customerId?.map((err) => (
            <p key={err} className="text-sm text-red-500">
              {err}
            </p>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          className="block w-full rounded border p-2"
          aria-describedby="amount-error"
        />
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.amount?.map((err) => (
            <p key={err} className="text-sm text-red-500">
              {err}
            </p>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          className="block w-full rounded border p-2"
          aria-describedby="status-error"
        >
          <option value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.errors?.status?.map((err) => (
            <p key={err} className="text-sm text-red-500">
              {err}
            </p>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Create Invoice
      </button>

      {/* Form message */}
      {state.message && <p className="text-red-500">{state.message}</p>}
    </form>
  );
}
