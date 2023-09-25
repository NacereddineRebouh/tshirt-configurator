import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
import "@/styles/globals.css";
import Providers from "@/utils/Providers/Providers";

export const metadata: Metadata = {
  title: "T-Shirt Configurator",
  description: "T-Shirt Configurator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} h-screen select-none flex items-center`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
