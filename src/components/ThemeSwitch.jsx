"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "system") {
      const systemThemeDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(systemThemeDark ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className="flex h-10 w-10 items-center justify-center rounded-2xl border border-dashed border-light-border transition hover:scale-100 dark:border-dark-border"
    >
      <Sun size={18} className="text-light-body dark:hidden" />
      <MoonStar size={18} className="hidden text-dark-body dark:block" />
    </button>
  );
}
