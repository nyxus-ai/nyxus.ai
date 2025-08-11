// src/app/components/Contact.js
'use client';
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ status: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ status: '', message: '' });

    try {
      // Simulate API call
      setTimeout(() => {
        setFormStatus({ status: 'success', message: 'Form submitted successfully! (Placeholder)' });
        setFormData({ name: '', email: '', message: '' });
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      setFormStatus({ status: 'error', message: 'Network error. Could not submit form.' });
      console.error("Submission error:", error);
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        {/* Fix: Escape the apostrophe */}
        <h2 className="text-4xl font-bold text-white">Let&#39;s Build Something Great</h2>
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
  );
}