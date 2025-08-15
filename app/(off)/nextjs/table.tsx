import { fetchFilteredInvoices } from "@/app/lib/data";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <table className="mt-4 w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv) => (
          <tr key={inv.id}>
            <td className="border p-2">{inv.id}</td>
            <td className="border p-2">{inv.amount}</td>
            <td className="border p-2">${inv.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
