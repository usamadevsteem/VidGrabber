export default function Legal({ type }: { type: 'privacy' | 'terms' | 'dmca' | 'about' }) {
  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    dmca: "DMCA Notice",
    about: "About SnapFetch"
  };

  return (
    <div className="container max-w-3xl py-24">
      <h1 className="text-4xl font-bold mb-8">{titles[type]}</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>This is a placeholder for the {titles[type]} content. In a real application, this would contain the full legal text or about page information.</p>
        <h2>1. Introduction</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h2>2. Data Collection</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </div>
  );
}
