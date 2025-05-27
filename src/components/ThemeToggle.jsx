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
        // fixed positioning with responsive offsets
        "fixed z-50",
        "top-2 right-2 sm:top-4 sm:right-4 md:top-5 md:right-5 lg:top-6 lg:right-6",
        // responsive padding
        "p-1 sm:p-2 md:p-3 lg:p-4",
        // styling
        "rounded-full transition-colors duration-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      )}
    >
      {isDarkMode ? (
        <Sun
          className={cn(
            // responsive icon sizes
            "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8",
            "text-yellow-300"
          )}
        />
      ) : (
        <Moon
          className={cn(
            // responsive icon sizes
            "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8",
            "text-blue-900 dark:text-blue-200"
          )}
        />
      )}
    </button>
  );
};
