import "@/globals.css";
import { Outfit } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Blog | Elijah Blackmore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-light-surface dark:bg-dark-surface">
      <body
        className={`${outfit.variable} ${jetbrains.variable} mx-auto mt-20 max-w-3xl px-6 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
