import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme");
    const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemDarkMode)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
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
    <>
      {/* Desktop/Tablet Theme Toggle - Top Right */}
      <button
        onClick={toggleTheme}
        className={cn(
          "fixed hidden sm:flex top-4 right-4 lg:top-5 lg:right-5 z-50 p-2 lg:p-3 rounded-full transition-all duration-300",
          "bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg",
          "hover:bg-foreground/10 hover:scale-105 hover:shadow-xl",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
        )}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400 transition-transform duration-300 hover:rotate-180" />
        ) : (
          <Moon className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600 transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>

      {/* Mobile Theme Toggle - Bottom Right FAB */}
      <button
        onClick={toggleTheme}
        className={cn(
          "fixed sm:hidden bottom-6 right-6 z-50 p-3 rounded-full transition-all duration-300",
          "bg-primary text-primary-foreground shadow-2xl border-2 border-background",
          "hover:scale-110 hover:shadow-primary/25 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
        )}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-6 w-6 transition-transform duration-300" />
        ) : (
          <Moon className="h-6 w-6 transition-transform duration-300" />
        )}
      </button>

      {/* Mobile Theme Toggle Alternative - In Navbar when menu is open */}
      <div className="sm:hidden">
        <div 
          className={cn(
            "fixed top-4 right-16 z-50 transition-all duration-300",
            "opacity-100 pointer-events-auto"
          )}
        >
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              "bg-background/80 backdrop-blur-sm border border-border/50",
              "hover:bg-foreground/10 hover:scale-105",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-blue-600" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};