import React from 'react';
import { Briefcase } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">About Nyxus.ai</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Bridging the gap between powerful AI technology and real-world business needs.
        </p>
      </div>
      <div className="max-w-4xl mx-auto bg-gray-900 p-10 rounded-xl shadow-lg border border-gray-800">
        <p className="text-lg text-gray-300 leading-relaxed">
          Nyxus.ai was founded with a singular mission: to make powerful AI accessible to every business, regardless of size. As a solo founder, I believe in a hands-on, personalized approach. I work directly with you to understand your unique challenges and translate the &quot;buzzwords&quot; of AI into tangible, high-value solutions. My expertise spans a wide range of AI tools and frameworks, ensuring that the final solution is not just a technology, but a real asset that drives your business forward. I&apos;m here to be your technical partner, your consultant, and your guide on the journey to AI integration.
        </p>
        <div className="flex justify-center mt-8">
          <Briefcase className="text-indigo-400" size={48} />
        </div>
      </div>
    </section>
  );
}