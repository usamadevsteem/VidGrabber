import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="flex flex-col w-full bg-white min-h-[calc(100vh-4rem-400px)] pb-24">
      <section className="w-full pt-20 pb-16 flex flex-col items-center text-center px-4 relative bg-[#e8fdf4]">
        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Have a question or need help? Reach out to our team.
          </p>
        </div>
      </section>

      <div className="container max-w-2xl px-4 mt-16">
        <form className="space-y-6 bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm" onSubmit={e => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">First Name</label>
              <Input placeholder="John" className="h-12 bg-gray-50 border-gray-200 focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Last Name</label>
              <Input placeholder="Doe" className="h-12 bg-gray-50 border-gray-200 focus-visible:ring-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <Input type="email" placeholder="john@example.com" className="h-12 bg-gray-50 border-gray-200 focus-visible:ring-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Message</label>
            <Textarea placeholder="How can we help you?" className="min-h-[150px] bg-gray-50 border-gray-200 focus-visible:ring-primary resize-y text-base p-4" />
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-14 text-lg font-semibold shadow-md transition-transform active:scale-[0.98]" size="lg">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}