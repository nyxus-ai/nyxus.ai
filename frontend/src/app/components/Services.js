import React from 'react';
import { Bot, Workflow, FileText, Video, ShoppingCart, Lightbulb } from 'lucide-react';

export default function Services() {
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

  return (
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
  );
}