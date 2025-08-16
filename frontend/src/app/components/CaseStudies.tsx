import React from 'react';
import { FileSearch, ChartBar, Globe } from 'lucide-react';

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 'case-study-1',
      icon: <FileSearch className="w-10 h-10 text-indigo-400" />,
      title: 'Enhanced Customer Service for Retail',
      description: 'Developed a custom chatbot for a large e-commerce client that handled over 80% of routine customer inquiries, drastically reducing support staff workload and improving response times.'
    },
    {
      id: 'case-study-2',
      icon: <ChartBar className="w-10 h-10 text-indigo-400" />,
      title: 'Automated Financial Reporting',
      description: 'Implemented a workflow automation system for a financial services firm that automatically summarized and generated weekly reports from raw data, saving over 30 hours of manual work per month.'
    },
    {
      id: 'case-study-3',
      icon: <Globe className="w-10 h-10 text-indigo-400" />,
      title: 'Streamlined Content Creation',
      description: 'Built a content generation tool for a marketing agency that used a powerful language model to generate product descriptions and social media posts, increasing their content output by 200%.'
    },
  ];

  return (
    <section id="case-studies" className="container mx-auto px-6 py-20 bg-gray-900 rounded-xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">Our Case Studies</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Discover how we can transform your business with innovative AI solutions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((study) => (
          <div key={study.id} className="bg-gray-950 p-10 rounded-xl shadow-lg border border-gray-800 transition-all duration-300 hover:bg-gray-800 hover:border-indigo-600 transform hover:-translate-y-2 group">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-indigo-900 group-hover:bg-indigo-700 transition-colors duration-300">
                {study.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{study.title}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">{study.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
