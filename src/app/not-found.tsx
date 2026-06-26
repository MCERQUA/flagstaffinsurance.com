import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center bg-warm-white">
        <div className="text-center px-4">
          <p className="font-body text-ember-orange font-bold text-lg mb-2">404</p>
          <h1 className="font-heading text-4xl text-bark font-bold mb-4">Page Not Found</h1>
          <p className="font-body text-muted mb-8">The page you are looking for does not exist.</p>
          <Link href="/" className="bg-forest-green text-white px-6 py-3 rounded-lg font-body font-bold hover:bg-forest-green-dark transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
