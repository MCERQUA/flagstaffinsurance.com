import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CTABand } from "@/components/sections/CTABand";
import { FadeIn } from "@/components/animations/FadeIn";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flagstaff Business Insurance Blog",
  description: `Guides on GL, workers comp, completed operations, and surety bonds for flagstaff businesses. Expert advice from ${SITE.name}.`,
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4">Flagstaff Insurance Blog</h1>
              <p className="font-body text-white/80 text-lg max-w-2xl">
                Expert guides on insurance for wood and steel flagstaff businesses.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            {posts.length === 0 ? (
              <p className="font-body text-muted text-center">No posts yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, i) => (
                  <FadeIn key={post.slug} delay={i * 0.05}>
                    <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-border hover:border-forest-green hover:shadow-md transition-all h-full flex flex-col">
                      <div className="relative h-48 bg-forest-green-50">
                        <Image src={post.image || "/images/blog-default.jpg"} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <span className="inline-block text-xs font-bold font-body text-ember-orange bg-ember-orange/10 px-2 py-1 rounded-full mb-3">{post.category}</span>
                        <h2 className="font-heading font-bold text-bark text-lg leading-snug mb-3 group-hover:text-forest-green transition-colors flex-1">{post.title}</h2>
                        <p className="font-body text-sm text-muted leading-relaxed mb-4 line-clamp-2">{post.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted font-body mt-auto">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.date)}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
