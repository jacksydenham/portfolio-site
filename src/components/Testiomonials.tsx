// Testimonials.tsx
const testimonials = [
  {
    name: "Jordan Hacking",
    role: "KeyDocs Technical Lead, Astral Consulting",
    avatar: "/images/jordan.png",
    quote:
      "Jack went above and beyond by tackling and completing dozens of Jira tickets in a single sprint. It earned him a well-deserved applause in our retrospective.",
    },
  {
    name: "",
    role: "",
    avatar: "images/placeholder.png",
    quote:
      "WIP - Trusted Reference - Waiting on email response for tesitmonail.",
  },
];


export default function TestimonialStrip() {
  return (
    <section className="testimonials thin">
      <h2 className="section-heading">What others say</h2>

      <div className="testi-track">
        {testimonials.map((t) => (
          <figure key={t.name} className="testi-card">
            <img src={t.avatar} alt={t.name} className="testi-avatar" />
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              {t.name}
              <span>{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}