'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const NavLink = ({ id, text }) => (
    <a
      onClick={() => handleNavClick(id)}
      className="relative py-2 px-4 transition-colors duration-300 ease-in-out cursor-pointer text-gray-300 hover:text-indigo-400"
    >
      {text}
    </a>
  );

  return (
    <nav className="fixed w-full z-50 bg-gray-950/70 backdrop-blur-lg border-b border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white flex items-center">
          <img
            src="https://placehold.co/32x32/38bdf8/ffffff?text=N"
            alt="Nyxus AI Logo"
            width="32"
            height="32"
            className="mr-2 rounded-full"
          />
          nyxus.ai
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <NavLink id="services" text="Services" />
          <NavLink id="case-studies" text="Case Studies" />
          <NavLink id="blog" text="Blog" />
          <NavLink id="about" text="About" />
          <NavLink id="faqs" text="FAQs" />
          <NavLink id="contact" text="Contact" />
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
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
