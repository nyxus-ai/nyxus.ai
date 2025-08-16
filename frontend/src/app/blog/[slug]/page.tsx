import { createClient, Entry } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Link from 'next/link';
import Image from 'next/image';

interface AuthorDetails {
  fullName?: string;
  jobTitle?: string;
  profilePicture?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

// Blog post fields expected from Contentful
interface BlogPostFields {
  title: string;
  slug: string;
  content?: any; // Contentful rich text can be typed more strictly, but `any` here is fine because it's passed into documentToHtmlString
  date?: string;
  featuredImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  author?: {
    sys: { id: string };
    fields?: AuthorDetails;
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
  });

  try {
    // 👇 Strongly typed response
    const res = await client.getEntries<BlogPostFields>({
      content_type: 'blogPost',
      'fields.slug': slug,
      include: 10,
    });

    if (res.items.length === 0) {
      return (
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white">Post Not Found</h2>
          <p className="text-gray-400">Could not find a blog post with this slug.</p>
        </div>
      );
    }

    const post: Entry<BlogPostFields> = res.items[0];
    const { title, content, date } = post.fields;

    let authorDetails: AuthorDetails | null = null;

    if (post.fields.author?.fields) {
      authorDetails = post.fields.author.fields;
    } else if (post.fields.author?.sys?.id && res.includes?.Entry) {
      const authorId = post.fields.author.sys.id;

      // 👇 Strictly typed, no `any`
      const foundAuthorEntry = res.includes.Entry.find(
        (entry: Entry<AuthorDetails>) => entry.sys.id === authorId
      );

      if (foundAuthorEntry) {
        authorDetails = foundAuthorEntry.fields;
      }
    }

    const postImageUrl = post.fields.featuredImage?.fields?.file?.url
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

        <div className="relative w-full h-60 rounded-lg overflow-hidden mb-6">
          <Image
            src={postImageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>

        <p className="text-gray-400 mb-2">
          {date
            ? new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'No date'}
        </p>

        {authorDetails ? (
          <div className="flex items-center mb-6">
            {authorDetails.profilePicture?.fields?.file?.url && (
              <div className="relative w-10 h-10 rounded-full mr-3 overflow-hidden">
                <Image
                  src={`https:${authorDetails.profilePicture.fields.file.url}`}
                  alt={authorDetails.fullName || 'Author'}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-gray-400 text-sm">
              By <span className="font-medium">{authorDetails.fullName || 'Unknown Name'}</span>
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
