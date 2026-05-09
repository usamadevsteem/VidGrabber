import { useListBlogPosts } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Blog() {
  const { data: posts, isLoading } = useListBlogPosts();

  if (isLoading) {
    return <div className="py-32 flex justify-center bg-white min-h-[calc(100vh-4rem-400px)]"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  return (
    <div className="flex flex-col w-full bg-white min-h-[calc(100vh-4rem-400px)] pb-24">
      <section className="w-full pt-20 pb-16 flex flex-col items-center text-center px-4 relative bg-[#e8fdf4]">
        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
            SnapFetch Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Tips, tricks, guides, and the latest updates from our team.
          </p>
        </div>
      </section>

      <div className="container max-w-screen-xl px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer bg-white border border-gray-200 overflow-hidden group">
                {post.coverImage && (
                  <div className="w-full h-48 bg-gray-100 overflow-hidden">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                    <span className="text-xs text-gray-500 font-medium">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 text-gray-900 group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3 mt-3 text-gray-600 text-base">{post.excerpt}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}