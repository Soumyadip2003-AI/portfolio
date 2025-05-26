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
        // Position fixed top-right on all screens
        "fixed top-4 right-4 z-50",
        // Padding adjusts per screen
        "p-2 sm:p-3 md:p-4",
        // Rounded and transition
        "rounded-full transition-colors duration-300 focus:outline-none",
        // Background colors
        "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      )}
    >
      {isDarkMode ? (
        <Sun
          className={cn(
            // Responsive sizing
            "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8",
            // Color
            "text-yellow-300"
          )}
        />
      ) : (
        <Moon
          className={cn(
            // Responsive sizing
            "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8",
            // Color
            "text-blue-900 dark:text-blue-200"
          )}
        />
      )}
    </button>
  );
};
