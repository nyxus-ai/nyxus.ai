// src/app/components/Blog.js
'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { Newspaper, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogError, setBlogError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const client = createClient({
          space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
          accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        });

        const response = await client.getEntries({
          content_type: 'blogPost',
          order: '-fields.date', // newest first
        });

        const fetchedPosts = response.items.map(item => {
          const slug = item.fields.slug;
          if (!slug) {
            console.warn(`Post "${item.fields.title}" is missing a slug`);
          }
          return {
            id: item.sys.id,
            title: item.fields.title,
            summary: item.fields.summary || '',
            date: item.fields.date || '',
            slug: slug || '',
            // Handle image URL for blog list in component
            imageUrl: item.fields.featuredImage?.fields.file.url
              ? `https:${item.fields.featuredImage.fields.file.url}`
              : '/default.png' // Ensure /public/default.png exists
          };
        });

        setBlogPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching blog posts from Contentful:', error);
        setBlogError('Failed to load blog posts. Check your network connection and Contentful API keys.');
        setBlogPosts([]);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">Latest from Our Blog</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Stay updated with our latest insights on AI, technology, and business innovation.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogError ? (
          <p className="col-span-full text-center text-red-400">{blogError}</p>
        ) : blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 transition-all duration-300 hover:bg-gray-800 hover:border-indigo-600 transform hover:-translate-y-2 group"
            >
              {/* Fix: Use next/image for blog list item image in component */}
              <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
                 <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizing hint
                    className="object-cover"
                />
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Newspaper className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-4">{post.summary}</p>

              {post.slug ? (
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition-colors duration-300"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              ) : (
                <span className="text-gray-500 italic">No slug available</span>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">Loading blog posts...</p>
        )}
      </div>
    </section>
  );
}