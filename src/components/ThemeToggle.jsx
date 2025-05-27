import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
    }

    // Load saved position
    const savedPosition = localStorage.getItem("themeTogglePosition");
    if (savedPosition) {
      try {
        const parsedPosition = JSON.parse(savedPosition);
        setPosition(parsedPosition);
      } catch (error) {
        console.error("Failed to parse saved position:", error);
      }
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

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;

    const buttonSize = 48; // Approximate button size
    const maxX = window.innerWidth - buttonSize;
    const maxY = window.innerHeight - buttonSize;

    const newX = Math.max(0, Math.min(maxX, clientX - dragOffset.x));
    const newY = Math.max(0, Math.min(maxY, clientY - dragOffset.y));

    // Use requestAnimationFrame for smooth transitions
    requestAnimationFrame(() => {
      setPosition({ x: newX, y: newY });
    });
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setIsAnimating(true);
      
      // Snap to edges if close enough
      const snapThreshold = 50;
      const buttonSize = 48;
      let finalX = position.x;
      let finalY = position.y;
      
      // Snap to left or right edge
      if (position.x < snapThreshold) {
        finalX = 10;
      } else if (position.x > window.innerWidth - buttonSize - snapThreshold) {
        finalX = window.innerWidth - buttonSize - 10;
      }
      
      // Snap to top or bottom edge
      if (position.y < snapThreshold) {
        finalY = 10;
      } else if (position.y > window.innerHeight - buttonSize - snapThreshold) {
        finalY = window.innerHeight - buttonSize - 10;
      }
      
      // Smooth transition to final position
      if (finalX !== position.x || finalY !== position.y) {
        setTimeout(() => {
          setPosition({ x: finalX, y: finalY });
        }, 50);
      }
      
      // Save position to localStorage
      setTimeout(() => {
        localStorage.setItem("themeTogglePosition", JSON.stringify({ x: finalX, y: finalY }));
        setIsAnimating(false);
      }, 350);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isDragging, dragOffset, position]);

  const handleClick = (e) => {
    // Only toggle theme if we're not dragging
    if (!isDragging) {
      toggleTheme();
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? 'scale(1.1)' : 'scale(1)',
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, left, top',
      }}
      className={cn(
        "fixed z-50 p-3 rounded-full cursor-move",
        "bg-background/90 backdrop-blur-sm border-2 border-border/50 shadow-lg",
        "hover:bg-foreground/10 hover:scale-105 hover:shadow-xl active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
        "select-none touch-none",
        "transition-all duration-300 ease-out",
        isDragging 
          ? "shadow-2xl ring-2 ring-primary/30 backdrop-blur-md" 
          : "hover:shadow-xl hover:backdrop-blur-md"
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-400 transition-all duration-500 ease-out pointer-events-none hover:rotate-180" />
      ) : (
        <Moon className="h-6 w-6 text-blue-600 transition-all duration-500 ease-out pointer-events-none hover:-rotate-12" />
      )}
      
      {/* Visual indicator for draggable */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/60 rounded-full transition-all duration-300 animate-pulse hover:scale-110" />
    </button>
  );
};