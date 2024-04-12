"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-light-elevation-20 dark:bg-dark-elevation-20"
    >
      <Sun size={20} className="text-light-body dark:hidden" />
      <MoonStar size={20} className="hidden text-dark-body dark:block" />
    </button>
  );
}
