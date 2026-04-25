"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "صفحه ی اصلی", href: "/" },
    { name: "دوره ها", href: "/courses" },
    { name: "بلاگ", href: "/blog" },
    { name: "تماس با ما", href: "/contact" },
    { name: "درباره ی ما", href: "/about" },
  ];

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
              Chess<span className="text-amber-500">Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Login/Signup Button (Persian) - لینک دار */}
          <div className="hidden md:block">
            <Link href="/login">
              <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
                ورود / ثبت‌نام
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 animate-slideDown">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-white px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-gray-900"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-2 rounded-lg transition-all">
                    ورود / ثبت‌نام
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;