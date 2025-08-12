// No heavy video player; we use a lightweight YouTube thumbnail link.
function MobileWarning({
  setShowQrOverlay,
}: {
  setShowQrOverlay: (value: boolean) => void;
}) {
  const ytId = "KLzVZLph8FA";
  const ytUrl = `https://youtu.be/${ytId}`;
  const thumbUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

  return (
    <div className="mobile-qr-overlay">
      <div className="mobile-qr-dialog" role="dialog" aria-modal="true">
        {/* Header */}
        <h1>😅 Mobile Warning</h1>
        <p>This site uses 3D and doesn't scale well on phones. If you want to view it now:</p>

        {/* Video (thumbnail opens YouTube app) */}
        <a
          className="video-thumb"
          href={ytUrl}
          target="_blank"
          rel="noopener"
          aria-label="Watch a 2-minute walkthrough on YouTube"
          style={{ backgroundImage: `url(${thumbUrl})` }}
        >
          <span className="play-badge">Watch 2-min demo</span>
        </a>

        {/* Contact links */}
        <p>
          <strong>Or grab my details:</strong>
        </p>
        <div className="hero-links">
          <a
            href="/Jack Sydenham FSD Resume 2025.pdf"
            download
            className="hero-btn hero-cv"
          >
          </a>
          <a
            href="https://github.com/JackSydenham"
            target="_blank"
            rel="noopener"
            className="hero-btn hero-github"
          >
          </a>
          <a
            href="https://www.linkedin.com/in/jack-sydenham-bb5a25284/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="hero-btn hero-linkedin"
          >
          </a>
        </div>

        {/* Close */}
        <button
          className="mobile-qr-close"
          onClick={() => setShowQrOverlay(false)}
        >
          Continue anyway
        </button>
      </div>
    </div>
  );
}

export default MobileWarning;
