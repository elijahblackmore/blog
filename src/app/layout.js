import { Inter } from "next/font/google";
import "@/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: `Blog | Elijah Blackmore`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-light-surface dark:bg-dark-surface">
      <body className={`${inter.className} mx-auto mt-24 max-w-2xl px-6`}>
        {children}
      </body>
    </html>
  );
}
