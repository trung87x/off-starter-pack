import { Inter, Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const interLight = Inter({ subsets: ["latin"], weight: "300" });

export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: "400",
});
