import { useEffect } from "react";

export const DarkModeOnly = () => {
  useEffect(() => {
    // Force dark mode on component mount
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  return null; // No UI needed since we're just setting dark mode
};