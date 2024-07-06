import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./providers";
import { AppbarClient } from "../components/AppbarClient";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Wallet App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <body className={inter.className}>
            <AppbarClient />
            {children}</body>
        </Provider>

      </body>
    </html>
  );
}
