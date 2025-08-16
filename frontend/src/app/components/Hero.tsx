'use client';
import React from 'react';

export default function Hero() {
  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen pt-24 text-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gray-950 opacity-90"></div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-gray-950"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 0% 100%)',
          opacity: 0.2,
        }}
      ></div>
      <div className="container mx-auto relative z-10 py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 animate-pulse-slow">
          Unlocking Your Business Potential with AI
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          We are your dedicated partner for bespoke AI solutions, from custom chatbots to intelligent workflow automation.
        </p>
        <button
          onClick={() => handleNavClick('contact')}
          className="mt-12 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Start Your AI Journey
        </button>
      </div>
    </section>
  );
}
