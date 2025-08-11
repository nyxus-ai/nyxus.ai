// src/app/blog/page.js
import { createClient } from 'contentful';
import Link from 'next/link';

async function getBlogPosts() {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.date', 
  });

  return res.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    summary: item.fields.summary || '',
    date: item.fields.date || '',
    slug: item.fields.slug,
    imageUrl: item.fields.featuredImage?.fields.file.url
      ? `https:${item.fields.featuredImage.fields.file.url}`
      : '/default.png', 
  }));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white">Latest from Our Blog</h1>
        <p className="mt-4 text-gray-400">Stay updated with our latest insights on AI, technology, and business innovation.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 transition-all duration-300 hover:bg-gray-800 hover:border-indigo-600 transform hover:-translate-y-2 group">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                  <path d="M12 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-4">{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className="text-indigo-400 hover:underline">
                Read More →
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No blog posts found.</p>
        )}
      </div>
    </section>
  );
}