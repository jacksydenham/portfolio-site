export type JournalEntry = {
  id: string;
  date: string;        // "YYYY-MM-DD"
  title: string;
  body?: string;
  tags?: string[];
};

export default function JournalRail({ entries }: { entries: JournalEntry[] }) {
  return (
    <aside className="journal-rail" aria-label="Journal">
      <div className="journal-shell">
        <div className="journal-header">
          <h2>Journal Entries</h2>
          <span className="journal-sub">Daily Dev Updates & Personal Wins</span>
        </div>

        <div className="journal-list" role="list">
          {entries.map((e) => (
            <article key={e.id} className="journal-item" role="listitem">
              <div className="journal-item-meta">
                <time>{e.date}</time>
                {e.tags && e.tags.length > 0 && (
                  <ul className="journal-tags">
                    {e.tags.map((t) => <li key={t}>#{t}</li>)}
                  </ul>
                )}
              </div>
              <h3 className="journal-item-title">{e.title}</h3>
              {e.body && <p className="journal-item-body">{e.body}</p>}
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
