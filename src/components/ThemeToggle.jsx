import { useEffect } from "react";

export const ApplyDarkMode = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return null;
};