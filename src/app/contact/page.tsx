"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error("submit failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4">Contact Us</h1>
              <p className="font-body text-white/80 text-lg max-w-xl">Get in touch with our flagstaff business insurance specialists. Same-day response, same-day quotes.</p>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <FadeIn>
                {submitted ? (
                  <div className="bg-white rounded-2xl border border-border p-10 text-center">
                    <CheckCircle className="w-14 h-14 text-forest-green mx-auto mb-4" />
                    <h2 className="font-heading text-2xl text-bark font-bold mb-3">Message Received!</h2>
                    <p className="font-body text-muted mb-6">We'll respond within a few hours during business hours (Mon–Fri 8am–5pm MST).</p>
                    <Link href="/" className="font-body text-sm font-bold text-forest-green hover:text-ember-orange transition-colors">Back to home</Link>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-border p-8">
                    <h2 className="font-heading text-2xl text-bark font-bold mb-6">Send Us a Message</h2>
                    <form
                      name="contact"
                      method="POST"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <input type="hidden" name="form-name" value="contact" />
                      <p hidden>
                        <label>Don&apos;t fill this out: <input name="bot-field" /></label>
                      </p>
                      {[
                        { name: "name", label: "Full Name", type: "text", required: true },
                        { name: "email", label: "Email Address", type: "email", required: true },
                        { name: "phone", label: "Phone Number", type: "tel", required: false },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="block font-body text-sm font-bold text-bark mb-1.5">{f.label}{f.required && <span className="text-ember-orange ml-1">*</span>}</label>
                          <input
                            type={f.type}
                            name={f.name}
                            required={f.required}
                            value={formData[f.name as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                            className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block font-body text-sm font-bold text-bark mb-1.5">Message</label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green resize-none"
                        />
                      </div>
                      {error && (
                        <div className="rounded-lg border border-ember-orange/40 bg-ember-orange/10 px-4 py-3">
                          <p className="font-body text-sm font-bold text-ember-orange">
                            Something went wrong — please call{" "}
                            <a href={SITE.phoneHref} className="underline">{SITE.phone}</a> or try again.
                          </p>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ember-orange text-white py-3 rounded-lg font-body font-bold text-sm hover:bg-ember-orange-dark transition-colors disabled:opacity-60"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </div>
                )}
              </FadeIn>

              <div className="space-y-6">
                <FadeIn direction="left">
                  <div className="bg-white rounded-2xl border border-border p-7">
                    <h2 className="font-heading text-xl text-bark font-bold mb-5">Contact Information</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-forest-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="w-4 h-4 text-forest-green" />
                        </div>
                        <div>
                          <p className="font-body text-xs text-muted">Phone</p>
                          <a href={SITE.phoneHref} className="font-body font-bold text-bark hover:text-ember-orange transition-colors">{SITE.phone}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-forest-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-forest-green" />
                        </div>
                        <div>
                          <p className="font-body text-xs text-muted">Email</p>
                          <a href={`mailto:${SITE.email}`} className="font-body font-bold text-bark hover:text-ember-orange transition-colors">{SITE.email}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-forest-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-forest-green" />
                        </div>
                        <div>
                          <p className="font-body text-xs text-muted">Hours</p>
                          <p className="font-body font-bold text-bark">{SITE.hours}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-forest-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-forest-green" />
                        </div>
                        <div>
                          <p className="font-body text-xs text-muted">Address</p>
                          <p className="font-body font-bold text-bark text-sm">{SITE.address.street}</p>
                          <p className="font-body text-bark text-sm">{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
                <FadeIn direction="left" delay={0.1}>
                  <div className="bg-ember-orange/10 border border-ember-orange/20 rounded-2xl p-6">
                    <p className="font-body text-sm font-bold text-ember-orange mb-2">Need a Certificate Quickly?</p>
                    <p className="font-body text-sm text-bark mb-3">We issue certificates and additional insured endorsements same-day. Call us directly for fastest service.</p>
                    <a href={SITE.phoneHref} className="font-body text-sm font-bold text-forest-green hover:text-ember-orange transition-colors">Call {SITE.phone} now →</a>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
