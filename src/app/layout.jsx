import "@/globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import { JetBrains_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Blog | Elijah Blackmore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} mx-auto flex min-h-screen max-w-3xl flex-col bg-light-surface px-6 font-sans dark:bg-dark-surface`}
      >
        <ThemeProvider
          attribute="class"
          themeColor={{ dark: "#141218", light: "#FEF7FF" }}
          enableSystem
          disableTransitionOnChange
        >
          <main className="mt-6 flex-1 md:mt-12">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
