import { useGetBlogPost } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { Loader2, ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading } = useGetBlogPost(params.slug || "", {
    query: {
      enabled: !!params.slug
    }
  });

  if (isLoading) {
    return <div className="py-32 flex justify-center bg-white min-h-[calc(100vh-4rem-400px)]"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  if (!post) {
    return <div className="py-32 text-center bg-white min-h-[calc(100vh-4rem-400px)] text-gray-900">Post not found</div>;
  }

  return (
    <article className="flex flex-col w-full bg-white min-h-[calc(100vh-4rem-400px)] pb-24">
      <div className="container max-w-3xl px-4 pt-16">
        <Button variant="ghost" className="mb-8 hover:bg-gray-100 text-gray-600" asChild>
          <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
        </Button>

        {post.coverImage && (
          <div className="w-full aspect-[21/9] bg-gray-100 rounded-2xl overflow-hidden mb-12 border border-gray-200">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 flex-wrap font-medium">
            <span className="font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
            <span className="flex items-center"><Calendar className="mr-2 h-4 w-4" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="flex items-center"><Clock className="mr-2 h-4 w-4" /> {post.readTime}</span>
            {post.author && <span className="flex items-center"><User className="mr-2 h-4 w-4" /> {post.author}</span>}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-gray-900">{post.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 prose-headings:text-gray-900 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {post.content}
        </div>
      </div>
    </article>
  );
}