import { useState, useMemo } from "react";

export type JournalCategory = "dev" | "health";

export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  body?: string;
  tags?: string[];
  category: "dev" | "health";
  points?: string[]; // optional explicit bullet points
};

function formatEntryDate(dateStr: string): string {
  const tryParseLocal = (s: string) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]); // local midnight
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  };
  const entry = tryParseLocal(dateStr);
  if (!entry) return dateStr;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const entryDay = new Date(entry.getFullYear(), entry.getMonth(), entry.getDate());
  const ms = 24 * 60 * 60 * 1000;
  const diff = Math.round((entryDay.getTime() - today.getTime()) / ms);
  if (diff === 0) return "Today";
  if (diff === -1) return "Yesterday";
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(entryDay);
}

/** numeric sortable key for YYYY-MM-DD or ISO-ish strings */
function dateKey(dateStr: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (m) return (+m[1]) * 10000 + (+m[2]) * 100 + (+m[3]); // YYYYMMDD
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return -Infinity; // push unknown to end
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

/** Split an entry's text into bullets + leftover text.
 * - If entry.points exists, we use that as bullets.
 * - Otherwise we parse body lines starting with "-", "*", or "•".
 */
function splitEntryContent(e: JournalEntry): { bullets: string[]; text?: string } {
  // If explicit points are provided, prefer them.
  if (e.points && e.points.length) {
    const leftover = (e.body ?? "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !/^(-|\*|•)\s+/.test(l))
      .join("\n")
      .trim();
    return { bullets: e.points, text: leftover || undefined };
  }

  // Otherwise, parse bullets out of the body
  const bullets: string[] = [];
  const leftoverLines: string[] = [];
  if (e.body) {
    for (const raw of e.body.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line) {
        leftoverLines.push("");
        continue;
      }
      const m = line.match(/^(-|\*|•)\s+(.*)$/);
      if (m && m[2]) bullets.push(m[2]);
      else leftoverLines.push(line);
    }
  }
  const text = leftoverLines.join("\n").trim() || undefined;
  return { bullets, text };
}

export default function JournalRail({ entries }: { entries: JournalEntry[] }) {
  const [filter, setFilter] = useState<"dev" | "health" | "all">("all");

  const filteredSorted = useMemo(() => {
    const arr = filter === "all" ? entries : entries.filter((e) => e.category === filter);
    // newest first; tie-break by id (desc) for stability
    return arr.slice().sort((a, b) => {
      const byDate = dateKey(b.date) - dateKey(a.date);
      return byDate !== 0 ? byDate : b.id.localeCompare(a.id);
    });
  }, [entries, filter]);

  return (
    <aside className="journal-rail" aria-label="Journal">
      <div className="journal-shell">
        <div className="journal-header">
          <h2>JOURNAL ENTRIES</h2>
          <span className="journal-sub">Daily Dev Updates & Personal Wins</span>

          <div className="journal-filter" role="tablist" aria-label="Journal category filter">
            <button
              className={`jtab ${filter === "dev" ? "active" : ""}`}
              role="tab"
              aria-selected={filter === "dev"}
              onClick={() => setFilter("dev")}
            >
              <span aria-hidden>🛠</span> Dev
            </button>
            <button
              className={`jtab ${filter === "health" ? "active" : ""}`}
              role="tab"
              aria-selected={filter === "health"}
              onClick={() => setFilter("health")}
            >
              <span aria-hidden>💪</span> Health
            </button>
            <button
              className={`jtab ${filter === "all" ? "active" : ""}`}
              role="tab"
              aria-selected={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All
            </button>
          </div>
        </div>

        <div className="journal-list" role="list">
          {filteredSorted.map((e) => {
            const { bullets, text } = splitEntryContent(e);

            return (
              <article key={e.id} className="journal-item" role="listitem">
                <div className="journal-item-meta">
                  <time dateTime={e.date}>{formatEntryDate(e.date)}</time>
                  <span
                    className={`jcat-badge ${e.category}`}
                    aria-label={e.category === "dev" ? "Developer entry" : "Health entry"}
                  >
                    {e.category === "dev" ? "🛠" : "💪"}
                  </span>
                  {e.tags && e.tags.length > 0 && (
                    <ul className="journal-tags">
                      {e.tags.map((t) => (
                        <li key={t}>#{t}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <h3 className="journal-item-title">{e.title}</h3>

                {/* Arrow bullet list (from points[] or parsed lines) */}
                {bullets.length > 0 && (
                  <ul className="j-points">
                    {bullets.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}

                {/* Remaining free text (newlines preserved) */}
                {text && <p className="journal-item-body">{text}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
