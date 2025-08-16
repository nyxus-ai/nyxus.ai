"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch knowledge base on mount
  useEffect(() => {
    fetch("http://localhost:8000/api/knowledge")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setKnowledgeBase(data.data);
        }
      })
      .catch((err) => console.error("Error loading knowledge base:", err));
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      // Call your FastAPI backend instead of Google API directly
      const response = await fetch("http://localhost:8000/api/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const result = await response.json();
      const botReply =
        result.bot_reply || "Sorry, I couldn’t find an answer.";

      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Oops! Something went wrong." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="bg-gray-900 w-80 h-[500px] rounded-xl shadow-xl flex flex-col border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl">
            <h2 className="text-white font-semibold">Nyxus.AI Chat</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-200 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg text-sm max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white self-end ml-auto"
                    : "bg-gray-800 text-gray-200 self-start"
                }`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-700 flex items-center">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg outline-none border border-gray-700 focus:border-indigo-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
