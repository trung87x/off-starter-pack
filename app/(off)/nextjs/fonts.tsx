import { inter, lusitana } from "@/app/ui/fonts";

export default function Example() {
  return (
    <>
      <h2 className={`${inter.className} antialiased`}>Hello world!</h2>
      <p className={`${lusitana.className} antialiased`}></p>
    </>
  );
}
