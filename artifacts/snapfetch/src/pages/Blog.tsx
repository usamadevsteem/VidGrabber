import { useListBlogPosts } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Blog() {
  const { data: posts, isLoading } = useListBlogPosts();

  if (isLoading) {
    return <div className="py-32 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  return (
    <div className="container max-w-screen-xl py-24">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">SnapFetch Blog</h1>
        <p className="text-xl text-muted-foreground">Tips, tricks, and updates from the team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:border-indigo-500/50 transition-colors cursor-pointer bg-card/50 overflow-hidden">
              {post.coverImage && (
                <div className="w-full h-48 bg-muted overflow-hidden">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">{post.excerpt}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
