// src/app/components/Navbar.js
'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image'; // Import next/image

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const NavLink = ({ id, text }) => (
    <a // Changed from button to anchor for semantic link-like behavior
      onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior
        handleNavClick(id);
      }}
      // Use href for better semantics and accessibility, even though we handle click
      href={`/#${id}`} 
      className="relative py-2 px-4 transition-colors duration-300 ease-in-out cursor-pointer text-gray-300 hover:text-indigo-400 block" // Added block for full-width link on mobile
    >
      {text}
    </a>
  );

  return (
    <nav className="fixed w-full z-50 bg-gray-950/70 backdrop-blur-lg border-b border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white flex items-center">
          {/* Use next/image for the logo */}
          {/* Ensure the image exists or use a valid external URL */}
          {/* Fix: Added unoptimized prop for external SVG placeholder */}
          <div className="relative w-8 h-8 mr-2 rounded-full overflow-hidden">
            <Image
              src="https://placehold.co/32x32/38bdf8/ffffff?text=N" // Or a local path like '/logo.png'
              alt="Nyxus AI Logo"
              fill
              sizes="32px" // Fixed size hint
              className="object-cover rounded-full"
              // Fix: Add unoptimized for external SVGs or if you don't want optimization
              unoptimized
            />
          </div>
          nyxus.ai
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <NavLink id="services" text="Services" />
          <NavLink id="case-studies" text="Case Studies" />
          <NavLink id="blog" text="Blog" />
          <NavLink id="about" text="About" />
          <NavLink id="faqs" text="FAQs" />
          <NavLink id="contact" text="Contact" />
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"} // Accessibility improvement
            aria-expanded={isMenuOpen} // Accessibility improvement
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 border-t border-gray-800">
          <NavLink id="services" text="Services" />
          <NavLink id="case-studies" text="Case Studies" />
          <NavLink id="blog" text="Blog" />
          <NavLink id="about" text="About" />
          <NavLink id="faqs" text="FAQs" />
          <NavLink id="contact" text="Contact" />
        </div>
      )}
    </nav>
  );
}