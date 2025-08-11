export default function FAQs() {
  const faqs = [
    {
      question: 'What kind of businesses do you work with?',
      answer: "We work with businesses of all sizes, from startups to large enterprises. Our solutions are tailored to your specific needs, whether you're looking for a simple chatbot or a complex automation system."
    },
    {
      question: 'How long does a typical project take?',
      answer: "Project timelines vary depending on the scope and complexity. A simple chatbot might take a few weeks, while a comprehensive workflow automation could take a few months. We'll provide a detailed timeline during the consultation phase."
    },
    {
      question: 'Do I need to have a technical background?',
      answer: "Not at all! We handle all the technical aspects. Our goal is to translate your business needs into an effective AI solution, and we'll guide you through every step of the process in a non-technical way."
    },
  ];

  return (
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
  );
}