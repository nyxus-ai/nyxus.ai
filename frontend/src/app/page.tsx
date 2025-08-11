import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Blog from './components/Blog';
import About from './components/About';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import Footer from './components/Footer';

// The main page component that assembles all other components.
// All component logic and state are now handled within their respective files.
export default function Home() {
  return (
    <>
      <title>Nyxus.ai - AI Integration & Consulting</title>
      <meta name="description" content="Dedicated partner for bespoke AI integration, from custom chatbots to intelligent workflow automation." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="bg-gray-950 text-white font-sans antialiased">
        <div className="min-h-screen">
          <Navbar />
          <Hero />
          <Services />
          <CaseStudies />
          <Blog />
          <About />
          <FAQs />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}
