import React from "react";

/**
 * Markdown subset renderer for blog post bodies.
 *
 * Extends the inline renderer in services/[slug] with ordered lists, tables,
 * blockquotes and links — the blog posts need all four and the services copy
 * does not. Input is repo-authored MDX, never user input.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" class="text-forest-green underline underline-offset-2 hover:text-ember-orange-dark transition-colors">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-bark font-bold">$1</strong>');
}

const isBullet = (l: string) => /^\s*[-*]\s+/.test(l);
const isNumbered = (l: string) => /^\s*\d+\.\s+/.test(l);

export function renderMarkdown(content: string): React.ReactNode[] {
  const blocks = content.split(/\n\n+/);
  const nodes: React.ReactNode[] = [];
  let key = 0;

  for (const raw of blocks) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const lines = trimmed.split("\n");

    if (trimmed.startsWith("## ")) {
      nodes.push(
        <h2 key={key++} className="font-heading text-2xl sm:text-3xl text-bark font-bold mt-12 mb-4 border-l-4 border-forest-green pl-4">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      nodes.push(
        <h3 key={key++} className="font-heading text-xl text-bark font-bold mt-8 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (lines.every((l) => l.trimStart().startsWith(">"))) {
      nodes.push(
        <blockquote
          key={key++}
          className="my-6 border-l-4 border-ember-orange bg-forest-green-50 rounded-r-xl px-6 py-4 font-body text-base text-bark leading-relaxed"
          dangerouslySetInnerHTML={{ __html: inline(lines.map((l) => l.replace(/^\s*>\s?/, "")).join(" ")) }}
        />
      );
    } else if (lines.length >= 2 && lines[0].trim().startsWith("|") && /^\s*\|[\s:|-]+\|\s*$/.test(lines[1])) {
      const cells = (row: string) =>
        row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
      const head = cells(lines[0]);
      const body = lines.slice(2).filter((l) => l.trim().startsWith("|")).map(cells);
      nodes.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left">
            <thead className="bg-forest-green">
              <tr>
                {head.map((h, i) => (
                  <th key={i} className="font-body text-xs font-bold uppercase tracking-wider text-white px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {body.map((row, r) => (
                <tr key={r} className={r % 2 ? "bg-forest-green-50/50" : undefined}>
                  {row.map((c, i) => (
                    <td
                      key={i}
                      className="font-body text-sm text-muted leading-relaxed px-4 py-3 align-top border-t border-border"
                      dangerouslySetInnerHTML={{ __html: inline(c) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (lines.every(isBullet)) {
      nodes.push(
        <ul key={key++} className="list-disc ml-6 space-y-2.5 my-5 marker:text-forest-green">
          {lines.map((l, i) => (
            <li key={i} className="font-body text-base text-muted leading-relaxed pl-1"
              dangerouslySetInnerHTML={{ __html: inline(l.replace(/^\s*[-*]\s+/, "")) }} />
          ))}
        </ul>
      );
    } else if (lines.every(isNumbered)) {
      nodes.push(
        <ol key={key++} className="list-decimal ml-6 space-y-2.5 my-5 marker:text-forest-green marker:font-bold">
          {lines.map((l, i) => (
            <li key={i} className="font-body text-base text-muted leading-relaxed pl-1"
              dangerouslySetInnerHTML={{ __html: inline(l.replace(/^\s*\d+\.\s+/, "")) }} />
          ))}
        </ol>
      );
    } else {
      nodes.push(
        <p key={key++} className="font-body text-base text-muted leading-[1.8] my-5"
          dangerouslySetInnerHTML={{ __html: inline(lines.join(" ")) }} />
      );
    }
  }
  return nodes;
}
