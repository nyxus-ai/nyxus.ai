// src/app/components/Navbar.tsx
'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface NavLinkProps {
  id: string;
  text: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const NavLink: React.FC<NavLinkProps> = ({ id, text }) => (
    <a
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        handleNavClick(id);
      }}
      href={`/#${id}`}
      className="relative py-2 px-4 transition-colors duration-300 ease-in-out cursor-pointer text-gray-300 hover:text-indigo-400 block"
    >
      {text}
    </a>
  );

  return (
    <nav className="fixed w-full z-50 bg-gray-950/70 backdrop-blur-lg border-b border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white flex items-center">
          <div className="relative w-8 h-8 mr-2 rounded-full overflow-hidden">
            <Image
              src="https://placehold.co/32x32/38bdf8/ffffff?text=N"
              alt="Nyxus AI Logo"
              fill
              sizes="32px"
              className="object-cover rounded-full"
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
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
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
