import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";
import {
  HOA_SECTIONS,
  HOA_FIELD_COUNT,
  HOA_YESNO_QUESTIONS,
  type HoaField,
} from "@/lib/homeowners-application-fields";
import { ShieldCheck, Phone, Mail, ArrowRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Homeowners Insurance Application",
  description:
    "Complete the full homeowners insurance application for Flagstaff and Northern Arizona homes — applicant details, property and construction, systems and protection, liability exposures, coverage selection, loss history and authorization.",
  alternates: { canonical: `${SITE.url}/homeowners-application` },
};

const FORM_NAME = "homeowners-application";

/**
 * The PDF marks nothing required. These three are required by the site so an
 * empty 281-field submission cannot be posted (junk leads / spam). Matches
 * sedona, telluride and barndominium. Nothing else on this form is required.
 */
const REQUIRED_FIELDS = new Set([
  "primary_applicant_-_full_legal_name_1",
  "primary_phone_7",
  "email_address_9",
]);

const inputClass =
  "w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark bg-white focus:outline-none focus:border-forest-green transition-colors";
const labelClass = "block font-body text-sm font-bold text-bark mb-1.5";

/**
 * Fields render in strict PDF order. Consecutive runs are grouped only for
 * layout — no field is reordered, renamed, merged or dropped.
 *  - "text"     : run of text inputs           -> responsive grid
 *  - "yesno"    : run of alternating Yes/No    -> paired rows
 *  - "checkbox" : any other run of checkboxes  -> checkbox chips
 */
type Block =
  | { kind: "text"; fields: HoaField[] }
  | { kind: "checkbox"; fields: HoaField[] }
  | { kind: "yesno"; fields: HoaField[] };

function buildBlocks(fields: HoaField[]): Block[] {
  const blocks: Block[] = [];

  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];

    if (f.type === "text") {
      const run: HoaField[] = [];
      while (i < fields.length && fields[i].type === "text") run.push(fields[i++]);
      i--;
      blocks.push({ kind: "text", fields: run });
      continue;
    }

    // A checkbox run. Split off any alternating Yes/No stretch so the paired
    // questions from the PDF stay visually paired.
    const isYes = (x?: HoaField) => !!x && x.type === "checkbox" && x.label === "Yes";
    const isNo = (x?: HoaField) => !!x && x.type === "checkbox" && x.label === "No";

    if (isYes(f) && i + 1 < fields.length && isNo(fields[i + 1])) {
      const run: HoaField[] = [];
      while (i + 1 < fields.length && isYes(fields[i]) && isNo(fields[i + 1])) {
        run.push(fields[i], fields[i + 1]);
        i += 2;
      }
      i--;
      blocks.push({ kind: "yesno", fields: run });
      continue;
    }

    const run: HoaField[] = [];
    while (i < fields.length && fields[i].type === "checkbox" && !(isYes(fields[i]) && isNo(fields[i + 1]))) {
      run.push(fields[i++]);
    }
    i--;
    blocks.push({ kind: "checkbox", fields: run });
  }

  return blocks;
}

function TextField({ field }: { field: HoaField }) {
  const required = REQUIRED_FIELDS.has(field.name);
  return (
    <div>
      <label htmlFor={field.name} className={labelClass}>
        {field.label}
        {required && <span className="text-ember-orange ml-1">*</span>}
      </label>
      <input
        id={field.name}
        name={field.name}
        type="text"
        required={required}
        maxLength={field.maxlen ?? undefined}
        className={inputClass}
      />
    </div>
  );
}

function CheckboxField({ field }: { field: HoaField }) {
  return (
    <label
      htmlFor={field.name}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-border bg-warm-white font-body text-sm text-bark cursor-pointer hover:border-forest-green transition-colors"
    >
      <input
        id={field.name}
        name={field.name}
        type="checkbox"
        value="Yes"
        className="h-4 w-4 rounded border-border accent-forest-green"
      />
      <span className="font-medium leading-snug">{field.label}</span>
    </label>
  );
}

function FormSection({ heading, fields }: { heading: string; fields: HoaField[] }) {
  const blocks = buildBlocks(fields);

  return (
    <FadeIn>
      <fieldset className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <legend className="px-3 -ml-1 font-heading text-lg md:text-xl font-bold text-bark">
          {heading}
        </legend>

        <div className="mt-4 space-y-6">
          {blocks.map((block, bi) => {
            if (block.kind === "text") {
              return (
                <div key={bi} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {block.fields.map((f) => (
                    <TextField key={f.name} field={f} />
                  ))}
                </div>
              );
            }

            if (block.kind === "checkbox") {
              return (
                <div key={bi} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {block.fields.map((f) => (
                    <CheckboxField key={f.name} field={f} />
                  ))}
                </div>
              );
            }

            // Yes / No pairs, labelled with the question text recovered from the
            // PDF. Display text only — field names and values are untouched.
            const pairs: HoaField[][] = [];
            for (let i = 0; i < block.fields.length; i += 2) {
              pairs.push([block.fields[i], block.fields[i + 1]]);
            }
            return (
              <div key={bi} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pairs.map(([yes, no]) => (
                  <div
                    key={yes.name}
                    className="px-4 py-3 rounded-lg border border-border bg-warm-white"
                  >
                    <p className="font-body text-sm font-bold text-bark leading-snug">
                      {HOA_YESNO_QUESTIONS[yes.name]}
                    </p>
                    <div className="mt-2 flex items-center gap-5">
                      <label
                        htmlFor={yes.name}
                        className="flex items-center gap-2 font-body text-sm text-bark cursor-pointer"
                      >
                        <input
                          id={yes.name}
                          name={yes.name}
                          type="checkbox"
                          value="Yes"
                          className="h-4 w-4 rounded border-border accent-forest-green"
                        />
                        {yes.label}
                      </label>
                      <label
                        htmlFor={no.name}
                        className="flex items-center gap-2 font-body text-sm text-bark cursor-pointer"
                      >
                        <input
                          id={no.name}
                          name={no.name}
                          type="checkbox"
                          value="Yes"
                          className="h-4 w-4 rounded border-border accent-forest-green"
                        />
                        {no.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </fieldset>
    </FadeIn>
  );
}

export default function HomeownersApplicationPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 font-body text-xs font-bold uppercase tracking-widest text-ember-orange mb-5">
                <FileText className="w-3.5 h-3.5" /> Homeowners application
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4">
                Homeowners Insurance Application
              </h1>
              <p className="font-body text-white/80 text-lg max-w-2xl">
                The full underwriting application for your Flagstaff home. Complete what you know —
                we&apos;ll follow up on anything left blank. Questions while you fill it out? Call{" "}
                <a href={SITE.phoneHref} className="text-ember-orange font-bold">
                  {SITE.phone}
                </a>
                .
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 font-body text-sm">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 text-ember-orange font-bold hover:text-ember-orange-light transition-colors"
                >
                  <Phone className="w-4 h-4" /> {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" /> {SITE.email}
                </a>
              </div>
              <p className="mt-5 font-body text-xs text-white/50">
                {HOA_FIELD_COUNT} fields across {HOA_SECTIONS.length} sections. Just want a fast
                estimate instead?{" "}
                <Link href="/quote" className="text-ember-orange font-bold hover:underline">
                  Request a quick quote
                </Link>
                .
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            <form
              name={FORM_NAME}
              method="POST"
              action="/homeowners-application/success"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p className="hidden">
                <label>
                  Do not fill this out if you are human: <input name="bot-field" />
                </label>
              </p>

              {HOA_SECTIONS.map((section) => (
                <FormSection key={section.page} heading={section.heading} fields={section.fields} />
              ))}

              <FadeIn>
                <div className="bg-white rounded-2xl border border-border p-6 md:p-8 text-center">
                  <p className="font-body text-sm text-muted max-w-2xl mx-auto">
                    By submitting this application you authorize {SITE.name} to obtain the reports
                    needed to quote and bind coverage. Nothing here binds coverage until a carrier
                    issues a policy.
                  </p>
                  <button
                    type="submit"
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-ember-orange text-white px-8 py-3.5 rounded-lg font-body font-bold hover:bg-ember-orange-dark transition-colors"
                  >
                    Submit application
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="mt-4 font-body text-xs text-muted inline-flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Your information is used only to quote
                    your coverage.
                  </p>
                </div>
              </FadeIn>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
