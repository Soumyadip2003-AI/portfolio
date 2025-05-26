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
        // Fixed position with responsive offsets
        "fixed z-50",
        "top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:top-8 lg:right-8",
        // Responsive padding
        "p-1 sm:p-2 md:p-3 lg:p-4",
        // Rounded and transition
        "rounded-full transition-all duration-300 focus:outline-none",
        // Background and hover
        "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      )}
    >
      {isDarkMode ? (
        <Sun
          className={cn(
            // Responsive icon sizes
            "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7",
            "text-yellow-300"
          )}
        />
      ) : (
        <Moon
          className={cn(
            // Responsive icon sizes
            "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7",
            "text-blue-900 dark:text-blue-200"
          )}
        />
      )}
    </button>
  );
};
