// src/app/page.tsx
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Blog from "./components/Blog";
import About from "./components/About";
import FAQs from "./components/FAQs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/chatbot";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nyxus.ai - AI Integration & Consulting</title>
        <meta
          name="description"
          content="Dedicated partner for bespoke AI integration, from custom chatbots to intelligent workflow automation."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

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
          <Chatbot />
        </div>
      </div>
    </>
  );
}
