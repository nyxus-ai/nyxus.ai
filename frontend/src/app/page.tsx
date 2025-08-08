'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Bot, Workflow, FileText, Video, ShoppingCart, Lightbulb, Menu, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ status: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const services = [
    {
      id: 'custom-chatbots',
      icon: <Bot className="w-10 h-10 text-indigo-400" />,
      title: 'Custom AI Chatbots',
      description: 'Build intelligent chatbots for customer support, HR, e-commerce, and internal knowledge bases using a modern tech stack like LangChain and OpenAI.'
    },
    {
      id: 'workflow-automation',
      icon: <Workflow className="w-10 h-10 text-indigo-400" />,
      title: 'Workflow Automation',
      description: 'Automate repetitive tasks like email replies, document summarization, and report generation by connecting powerful language models to your tools.'
    },
    {
      id: 'document-search',
      icon: <FileText className="w-10 h-10 text-indigo-400" />,
      title: 'AI-Driven Document Search',
      description: 'Enable your team to upload and ask questions about PDFs, Word files, and other documents using powerful RAG-based systems.'
    },
    {
      id: 'audio-video',
      icon: <Video className="w-10 h-10 text-indigo-400" />,
      title: 'AI for Audio/Video',
      description: 'Leverage AI for tasks like transcription, meeting summarization, podcast summarizers, and video highlight generation using tools like Whisper.'
    },
    {
      id: 'e-commerce-ai',
      icon: <ShoppingCart className="w-10 h-10 text-indigo-400" />,
      title: 'AI for E-Commerce',
      description: 'Boost your business with AI-powered product description generators, review summarizers, dynamic FAQ bots, and personalized recommendation systems.'
    },
    {
      id: 'ai-consulting',
      icon: <Lightbulb className="w-10 h-10 text-indigo-400" />,
      title: 'AI Consulting',
      description: 'As your trusted advisor, we help businesses understand where AI can fit into their existing systems and build Proof-of-Concepts (PoCs) to prove value.'
    },
  ];

  const testimonials = [
    {
      quote: `Working with Nyxus.ai was a game-changer for our customer support. The custom chatbot they built handles 80% of our inquiries, freeing up our team to focus on more complex issues.`,
      author: 'Jane Doe',
      company: 'Tech Solutions Inc.'
    },
    {
      quote: `The workflow automation solution has drastically improved our efficiency. We've seen a 30% reduction in time spent on manual reporting, all thanks to Nyxus.ai.`,
      author: 'John Smith',
      company: 'Global Logistics Co.'
    },
    {
      quote: `Their AI consulting helped us identify key opportunities for AI integration we never knew existed. They're not just a vendor; they're a true partner.`,
      author: 'Emily Chen',
      company: 'Innovate Health'
    },
  ];

  const faqs = [
    {
      question: 'What kind of businesses do you work with?',
      answer: `We work with businesses of all sizes, from startups to large enterprises. Our solutions are tailored to your specific needs, whether you're looking for a simple chatbot or a complex automation system.`
    },
    {
      question: 'How long does a typical project take?',
      answer: `Project timelines vary depending on the scope and complexity. A simple chatbot might take a few weeks, while a comprehensive workflow automation could take a few months. We'll provide a detailed timeline during the consultation phase.`
    },
    {
      question: 'Do I need to have a technical background?',
      answer: `Not at all! We handle all the technical aspects. Our goal is to translate your business needs into an effective AI solution, and we'll guide you through every step of the process in a non-technical way.`
    },
  ];

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const NavLink = ({ id, text }: { id: string; text: string }) => (
    <a
      onClick={() => handleNavClick(id)}
      className={`relative py-2 px-4 transition-colors duration-300 ease-in-out cursor-pointer hover:text-indigo-400 ${
        activeSection === id ? 'text-indigo-400' : 'text-gray-300'
      }`}
    >
      {text}
      {activeSection === id && (
        <span className="absolute bottom-0 left-1/2 w-8 h-0.5 bg-indigo-400 transform -translate-x-1/2 rounded-full transition-all duration-300"></span>
      )}
    </a>
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ status: '', message: '' });

    try {
      // FIX: Using the environment variable for the backend URL
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (!backendUrl) {
        setFormStatus({ status: 'error', message: 'Backend URL is not configured. Please check your Vercel environment variables.' });
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({ status: 'success', message: result.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({ status: 'error', message: result.detail || 'Failed to submit form.' });
      }
    } catch (error) {
      setFormStatus({ status: 'error', message: 'Network error. Please ensure the backend is running.' });
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'testimonials', 'about', 'faqs', 'contact'];
      let currentSection = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top < window.innerHeight / 2) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToNextTestimonial = () => {
    setActiveTestimonial((current) => (current + 1) % testimonials.length);
  };

  const goToPrevTestimonial = () => {
    setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <title>Nyxus.ai - AI Integration & Consulting</title>
      <meta name="description" content="Dedicated partner for bespoke AI integration, from custom chatbots to workflow automation." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="bg-gray-950 text-white font-sans antialiased">
        <div className="min-h-screen">
          {/* Navigation Bar */}
          <nav className="fixed w-full z-50 bg-gray-950/70 backdrop-blur-lg border-b border-gray-800 transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <div className="text-2xl font-bold text-white flex items-center">
                {/* FIX: Replaced <img> with <Image /> for Next.js optimization. */}
                {/* You may need to configure the placeholder.co domain in your next.config.js for this to work */}
                <Image
                  src="https://placehold.co/32x32/38bdf8/ffffff?text=N"
                  alt="Nyxus AI Logo"
                  width={32}
                  height={32}
                  className="mr-2 rounded-full"
                />
                nyxus.ai
              </div>
              <div className="hidden md:flex space-x-8 text-sm font-medium">
                <NavLink id="services" text="Services" />
                <NavLink id="testimonials" text="Testimonials" />
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
                <NavLink id="testimonials" text="Testimonials" />
                <NavLink id="about" text="About" />
                <NavLink id="faqs" text="FAQs" />
                <NavLink id="contact" text="Contact" />
              </div>
            )}
          </nav>

          {/* Hero Section */}
          <section id="hero" className="relative flex items-center justify-center min-h-screen pt-24 text-center px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gray-950 opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-gray-950" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 0% 100%)', opacity: 0.2 }}></div>
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

          {/* Services Section */}
          <section id="services" className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">Our Core AI Services</h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                We specialize in turning complex AI concepts into practical, valuable solutions that drive real business results.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800 transition-all duration-300 hover:bg-gray-800 hover:border-indigo-600 transform hover:-translate-y-2 group">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-full bg-indigo-900 group-hover:bg-indigo-700 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="container mx-auto px-6 py-20 bg-gray-900 rounded-xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">What Our Clients Say</h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                Building trust through proven results and client satisfaction.
              </p>
            </div>
            <div className="relative max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-gray-950 p-10 rounded-xl shadow-lg border border-gray-800 transition-opacity duration-500 ease-in-out ${
                    index === activeTestimonial ? 'opacity-100 block' : 'opacity-0 hidden absolute top-0 left-0 w-full'
                  }`}
                >
                  <p className="text-lg md:text-xl italic text-gray-300 leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                    <span className="block text-sm text-indigo-400 font-normal">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              ))}
              <button
                onClick={goToPrevTestimonial}
                className="absolute top-1/2 -left-12 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 text-white hover:bg-indigo-600 transition-colors duration-300"
              >
                <ChevronRight size={24} className="transform rotate-180" />
              </button>
              <button
                onClick={goToNextTestimonial}
                className="absolute top-1/2 -right-12 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 text-white hover:bg-indigo-600 transition-colors duration-300"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">About Nyxus.ai</h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                Bridging the gap between powerful AI technology and real-world business needs.
              </p>
            </div>
            <div className="max-w-4xl mx-auto bg-gray-900 p-10 rounded-xl shadow-lg border border-gray-800">
              <p className="text-lg text-gray-300 leading-relaxed">
                Nyxus.ai was founded with a singular mission: to make powerful AI accessible to every business, regardless of size. As a solo founder, I believe in a hands-on, personalized approach. I work directly with you to understand your unique challenges and translate the "buzzwords" of AI into tangible, high-value solutions. My expertise spans a wide range of AI tools and frameworks, ensuring that the final solution is not just a technology, but a real asset that drives your business forward. I'm here to be your technical partner, your consultant, and your guide on the journey to AI integration.
              </p>
              <div className="flex justify-center mt-8">
                <Briefcase className="text-indigo-400" size={48} />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faqs" className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                Have questions? We have answers.
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-gray-900 p-6 rounded-xl border border-gray-800 transition-all duration-300 open:bg-gray-800"
                >
                  <summary className="flex justify-between items-center text-lg font-semibold text-white cursor-pointer list-none after:content-['+'] after:text-2xl after:text-indigo-400 after:transition-transform after:duration-300 open:after:content-['−']">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">Let's Build Something Great</h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                Ready to integrate AI into your business? Get in touch for a free consultation.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800">
                <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
                  {formStatus.message && (
                    <div className={`p-4 rounded-md ${formStatus.status === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                      {formStatus.message}
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Tell us about your project..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Schedule a Call'}
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-950 border-t border-gray-800 mt-20 py-8">
            <div className="container mx-auto text-center px-6">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} nyxus.ai. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
