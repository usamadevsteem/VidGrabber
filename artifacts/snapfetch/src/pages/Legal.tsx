export default function Legal({ type }: { type: 'privacy' | 'terms' | 'dmca' | 'about' }) {
  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    dmca: "DMCA Notice",
    about: "About SnapFetch"
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-[calc(100vh-4rem-400px)] pb-24">
      <section className="w-full pt-16 pb-12 flex flex-col px-4 border-b border-gray-100">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            {titles[type]}
          </h1>
        </div>
      </section>

      <div className="container max-w-3xl px-4 mt-12">
        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-primary">
          <p className="text-gray-500 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          <p>This is a placeholder for the {titles[type]} content. In a real application, this would contain the full legal text or about page information.</p>
          
          <h2>1. Introduction</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          
          <h2>2. Data Collection</h2>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          
          <h2>3. Usage Terms</h2>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </div>
      </div>
    </div>
  );
}