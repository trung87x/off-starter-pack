import { notFound } from "next/navigation";

export default function ExamplePage() {
  const invoice = null; // Giả định không có dữ liệu

  if (!invoice) {
    notFound();
  }

  return <div>Invoice Details</div>;
}
