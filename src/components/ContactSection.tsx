import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

interface ContactSectionProps {
  anchorRef: React.RefObject<HTMLDivElement | null>;
}

export default function ContactSection({ anchorRef }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in every field.");
      return;
    }

    const form = e.currentTarget;
    const btn = form.querySelector("button");
    btn?.classList.add("glow-animate");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        {
          name,
          email,
          message,
          title: `Portfolio Contact: ${name}`,
          time: new Date().toLocaleString(),
          reply_to: email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        toast.success("Message sent!");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        toast.error("Oops, something went wrong.");
        console.error("EmailJS error:", err.text || err);
      })
      .finally(() => {
        setTimeout(() => btn?.classList.remove("glow-animate"), 2000);
      });
  };

  return (
    <section className="contact">
      <form className="contact-box" onSubmit={sendEmail}>
        <div className="contact-heading">
          <h2>Contact Me</h2>
          <p>{`Send me an email via this form and I'll be in touch!`}</p>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              margin: "16px",
              background: "#111",
              color: "#fff",
              border: "1px solid #333",
            },
          }}
        />
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          rows={4}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="form-actions">
          <button type="submit">Send</button>
        </div>
      </form>
      <section className="board-anchor">
        <div ref={anchorRef} className="board-anchor" />
      </section>
    </section>
  );
}
