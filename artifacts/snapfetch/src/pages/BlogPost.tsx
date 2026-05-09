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
    return <div className="py-32 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  if (!post) {
    return <div className="py-32 text-center">Post not found</div>;
  }

  return (
    <article className="container max-w-3xl py-24">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
      </Button>

      {post.coverImage && (
        <div className="w-full aspect-[21/9] bg-muted rounded-2xl overflow-hidden mb-12">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="mb-12">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
          <span className="font-medium text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">{post.category}</span>
          <span className="flex items-center"><Calendar className="mr-2 h-4 w-4" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
          <span className="flex items-center"><Clock className="mr-2 h-4 w-4" /> {post.readTime}</span>
          {post.author && <span className="flex items-center"><User className="mr-2 h-4 w-4" /> {post.author}</span>}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
        {post.content}
      </div>
    </article>
  );
}
