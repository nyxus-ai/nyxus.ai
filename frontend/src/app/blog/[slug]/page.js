// src/app/blog/[slug]/page.js
import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Link from 'next/link';

export default async function BlogPostPage({ params }) {
    const { slug } = await params; // Correct for Next.js 15

    const client = createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    });

    try {
        const res = await client.getEntries({
            content_type: 'blogPost',
            'fields.slug': slug,
            include: 10 
        });


        if (res.items.length === 0) {
            return (
                <div className="container mx-auto px-6 py-20 text-center">
                    <h2 className="text-3xl font-bold text-white">Post Not Found</h2>
                    <p className="text-gray-400">Could not find a blog post with this slug.</p>
                </div>
            );
        }

        const post = res.items[0];
        const { title, content, date } = post.fields;

        let authorDetails = null;
        if (post.fields.author && post.fields.author.fields) {
            authorDetails = post.fields.author.fields;
        } else if (post.fields.author?.sys?.id && res.includes?.Entry) {
            const authorId = post.fields.author.sys.id;
            const foundAuthorEntry = res.includes.Entry.find(
                entry => entry.sys.id === authorId
            );
            if (foundAuthorEntry) {
                authorDetails = foundAuthorEntry.fields;
            }
        }

        const imageUrl = post.fields.featuredImage?.fields?.file?.url
            ? `https:${post.fields.featuredImage.fields.file.url}`
            : '/default.png';

        const contentHtml = content
            ? documentToHtmlString(content)
            : 'No content available.';

        return (
            <div className="container mx-auto px-6 py-20 max-w-3xl">
                <Link href="/blog" className="text-indigo-400 hover:underline mb-6 block">
                    ← Back to Blog
                </Link>

                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-60 object-cover rounded-lg mb-6"
                />

                <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>

                {/* Display Date */}
                <p className="text-gray-400 mb-2">
                    {date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No date'}
                </p>

               
                {authorDetails ? (
                    <div className="flex items-center mb-6">
                      
                        {authorDetails.profilePicture?.fields?.file?.url && (
                            <img
                                src={`https:${authorDetails.profilePicture.fields.file.url}`}
                                alt={authorDetails.fullName || "Author"}
                                className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                        )}
                        {/* Render Author Name and Job Title */}
                        <span className="text-gray-400 text-sm">
                            By <span className="font-medium">{authorDetails.fullName || "Unknown Name"}</span>
                            {authorDetails.jobTitle && ` • ${authorDetails.jobTitle}`}
                        </span>
                    </div>
                ) : (
                    <p className="text-gray-400 mb-6">By Unknown Author</p>
                )}

                <div
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            </div>
        );
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-bold text-white">Error</h2>
                <p className="text-gray-400">Failed to load the blog post.</p>
            </div>
        );
    }
}