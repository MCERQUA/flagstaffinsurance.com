import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Phone, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SERVICES, SITE } from "@/lib/site";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} for Flagstaff Businesses`,
    description: service.description,
    openGraph: { title: service.title, description: service.description },
  };
}

function renderMarkdown(content: string): React.ReactNode[] {
  const paragraphs = content.split(/\n\n+/);
  const nodes: React.ReactNode[] = [];
  let key = 0;

  function inlineRender(text: string): string {
    return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  for (const block of paragraphs) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("## ")) {
      nodes.push(
        <h2 key={key++} className="font-heading text-2xl text-bark font-bold mt-8 mb-4 border-l-4 border-forest-green pl-4">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      nodes.push(
        <h3 key={key++} className="font-heading text-xl text-bark font-bold mt-6 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.split("\n").every((l) => l.trimStart().startsWith("- "))) {
      const items = trimmed.split("\n").map((l) => l.replace(/^\s*-\s+/, ""));
      nodes.push(
        <ul key={key++} className="list-disc ml-6 space-y-2 my-4">
          {items.map((item, i) => (
            <li key={i} className="font-body text-sm text-muted leading-relaxed"
              dangerouslySetInnerHTML={{ __html: inlineRender(item) }} />
          ))}
        </ul>
      );
    } else {
      nodes.push(
        <p key={key++} className="font-body text-sm text-muted leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: inlineRender(trimmed.replace(/\n/g, " ")) }} />
      );
    }
  }
  return nodes;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <Link href="/services" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-body mb-6 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> All Services
              </Link>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4">{service.title}</h1>
              <p className="font-body text-white/80 text-lg max-w-2xl">{service.description}</p>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <FadeIn>
                  <div className="prose-style">{renderMarkdown(service.longDescription)}</div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <div className="mt-10 bg-white rounded-2xl border border-border p-8">
                    <h2 className="font-heading text-2xl text-bark font-bold mb-6">What's Covered</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.coverages.map((c) => (
                        <div key={c} className="flex items-center gap-2.5">
                          <CheckCircle className="w-5 h-5 text-forest-green flex-shrink-0" />
                          <span className="font-body text-sm text-bark">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                {service.faqs.length > 0 && (
                  <FadeIn delay={0.15}>
                    <div className="mt-8">
                      <h2 className="font-heading text-2xl text-bark font-bold mb-6">Frequently Asked Questions</h2>
                      <div className="space-y-4">
                        {service.faqs.map((faq) => (
                          <div key={faq.q} className="bg-white rounded-xl border border-border p-6">
                            <p className="font-body font-bold text-bark text-sm mb-2">{faq.q}</p>
                            <p className="font-body text-sm text-muted leading-relaxed">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
              </div>

              <aside className="space-y-6">
                <FadeIn direction="left">
                  <div className="bg-forest-green rounded-2xl p-7 sticky top-24">
                    <h3 className="font-heading text-xl text-white font-bold mb-3">Get a Quote Today</h3>
                    <p className="font-body text-white/70 text-sm mb-6">Same-day quotes for flagstaff businesses. Certificates issued immediately after binding.</p>
                    <Link href="/quote" className="block w-full bg-ember-orange text-white text-center px-5 py-3 rounded-lg font-body font-bold text-sm hover:bg-ember-orange-dark transition-colors mb-3">
                      Request a Free Quote
                    </Link>
                    <a href={SITE.phoneHref} className="block w-full text-center text-white font-body font-semibold text-sm hover:text-white/80 transition-colors py-2">
                      Call {SITE.phone}
                    </a>
                  </div>
                </FadeIn>

                {others.length > 0 && (
                  <FadeIn direction="left" delay={0.1}>
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h3 className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-4">Other Coverages</h3>
                      <div className="space-y-3">
                        {others.map((s) => (
                          <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center justify-between group hover:text-forest-green transition-colors">
                            <span className="font-body text-sm text-bark group-hover:text-forest-green">{s.title}</span>
                            <ArrowRight className="w-4 h-4 text-muted group-hover:text-forest-green group-hover:translate-x-0.5 transition-all" />
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
