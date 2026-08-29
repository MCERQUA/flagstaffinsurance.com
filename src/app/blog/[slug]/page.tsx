import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { renderMarkdown } from "@/lib/markdown";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/lib/site";

const CONTACT_PHONE = "844-967-5247";
const CONTACT_PHONE_HREF = "tel:+18449675247";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.date,
      images: [{ url: `${SITE.url}${post.image}` }],
    },
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-US",
    articleSection: post.category,
    author: { "@type": "Organization", name: post.author, url: SITE.url },
    publisher: {
      "@type": "InsuranceAgency",
      name: SITE.name,
      url: SITE.url,
      telephone: CONTACT_PHONE,
      email: SITE.email,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-body mb-6 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> All Articles
              </Link>
              <span className="inline-block text-xs font-bold font-body text-white bg-ember-orange px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white font-bold mb-4 max-w-4xl leading-tight">
                {post.title}
              </h1>
              <p className="font-body text-white/80 text-lg max-w-3xl leading-relaxed">{post.description}</p>
              <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-white/60 font-body">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(post.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
                <span>By {post.author}</span>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <article className="lg:col-span-2">
                <FadeIn>
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border mb-10 bg-forest-green-50">
                    <Image
                      src={post.image || "/images/blog-default.jpg"}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.05}>
                  <div>{renderMarkdown(post.content)}</div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <div className="mt-12 bg-white rounded-2xl border border-border p-8">
                    <h2 className="font-heading text-2xl text-bark font-bold mb-3">Talk to a Northern Arizona Agent</h2>
                    <p className="font-body text-base text-muted leading-relaxed mb-6">
                      Every property and every business is different. We are an independent agency — we shop your
                      coverage across 40+ carriers and tell you plainly where the gaps are.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-ember-orange text-white px-6 py-3 rounded-lg font-body font-bold text-sm hover:bg-ember-orange-dark transition-colors">
                        Request a Free Quote <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a href={CONTACT_PHONE_HREF} className="inline-flex items-center justify-center gap-2 border border-border text-bark px-6 py-3 rounded-lg font-body font-bold text-sm hover:border-forest-green hover:text-forest-green transition-colors">
                        <Phone className="w-4 h-4" /> {CONTACT_PHONE}
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </article>

              <aside className="space-y-6">
                <FadeIn direction="left">
                  <div className="bg-forest-green rounded-2xl p-7 sticky top-24">
                    <h3 className="font-heading text-xl text-white font-bold mb-3">Get a Quote</h3>
                    <p className="font-body text-white/70 text-sm mb-6 leading-relaxed">
                      Free comparison quotes for homes, vehicles, rentals, and businesses across Flagstaff and
                      Coconino County.
                    </p>
                    <Link href="/quote" className="block w-full bg-ember-orange text-white text-center px-5 py-3 rounded-lg font-body font-bold text-sm hover:bg-ember-orange-dark transition-colors mb-4">
                      Start a Free Quote
                    </Link>
                    <a href={CONTACT_PHONE_HREF} className="flex items-center justify-center gap-2 text-white font-body font-semibold text-sm hover:text-white/80 transition-colors py-1">
                      <Phone className="w-4 h-4" /> {CONTACT_PHONE}
                    </a>
                    <a href={`mailto:${SITE.email}`} className="flex items-center justify-center gap-2 text-white/70 font-body text-xs hover:text-white transition-colors py-1 break-all">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" /> {SITE.email}
                    </a>
                  </div>
                </FadeIn>

                {related.length > 0 && (
                  <FadeIn direction="left" delay={0.1}>
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h3 className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-4">Related Reading</h3>
                      <div className="space-y-4">
                        {related.map((p) => (
                          <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                            <span className="font-body text-sm text-bark leading-snug group-hover:text-forest-green transition-colors">
                              {p.title}
                            </span>
                            <span className="block font-body text-xs text-muted mt-1">{formatDate(p.date)}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
