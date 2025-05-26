import { Moon, Sun } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Initialize theme
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

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingRef.current) {
        setPos({ x: e.clientX - offsetRef.current.x, y: e.clientY - offsetRef.current.y });
      }
    };
    const handleMouseUp = () => {
      draggingRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    draggingRef.current = true;
    offsetRef.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const toggleTheme = (e) => {
    e.stopPropagation();
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
      onMouseDown={handleMouseDown}
      onClick={toggleTheme}
      style={{ position: "fixed", left: pos.x, top: pos.y }}
      className={cn(
        "z-50 p-2 rounded-full transition-colors duration-300 focus:outline-none",
        "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      )}
    >
      {isDarkMode ? (
        <Sun className={cn("transition-transform duration-300 h-6 w-6 md:h-8 md:w-8 text-yellow-300")} />
      ) : (
        <Moon className={cn("transition-transform duration-300 h-6 w-6 md:h-8 md:w-8 text-blue-900 dark:text-blue-200")} />
      )}
    </button>
  );
};