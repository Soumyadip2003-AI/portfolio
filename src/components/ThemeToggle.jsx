import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed z-50 p-2 rounded-full transition-colors duration-300 focus:outline-none",
        // Position top-right on md and above, bottom-right on small screens
        "md:top-5 md:right-5 top-auto right-5 bottom-5",
        // Background and hover effects
        "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      )}
    >
      {isDarkMode ? (
        <Sun className={cn("transition-transform duration-300", "h-6 w-6 md:h-8 md:w-8 text-yellow-300")} />
      ) : (
        <Moon className={cn("transition-transform duration-300", "h-6 w-6 md:h-8 md:w-8 text-blue-900 dark:text-blue-200")} />
      )}
    </button>
  );
};
