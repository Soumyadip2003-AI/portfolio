import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Fixed the bug: should be scrollY, not screenY
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled 
          ? "py-2 sm:py-3 bg-background/80 backdrop-blur-md shadow-lg border-b border-border/50" 
          : "py-3 sm:py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          className="text-lg sm:text-xl font-bold text-primary flex items-center hover:opacity-80 transition-opacity duration-300"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> PedroTech </span>{" "}
            <span className="hidden xs:inline">Portfolio</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 xl:space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Tablet Navigation */}
        <div className="hidden md:flex lg:hidden space-x-4">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50 hover:bg-foreground/10 rounded-md transition-colors duration-300"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center mobile-menu-container",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-6 sm:space-y-8 text-center">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-xl sm:text-2xl text-foreground/80 hover:text-primary transition-colors duration-300 font-medium hover:scale-105 transform transition-transform"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
