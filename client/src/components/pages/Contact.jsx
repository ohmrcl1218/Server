import { useState } from "react";
import "../styles/Contact.css";
import { PROFILE } from "../config/Constants";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="contact">
      <p className="contact-kicker">Get in touch</p>
      <h1>Questions, corrections, or just say hello.</h1>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="c-name">Name</label>
          <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} required />

          <label htmlFor="c-email">Email</label>
          <input
            id="c-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="c-message">Message</label>
          <textarea
            id="c-message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button type="submit" className="contact-submit">
            Send message
          </button>

          {sent && <p className="contact-sent">Thanks — your message has been noted.</p>}
        </form>

        <div className="contact-details">
          <p className="contact-details-label">Direct</p>
          <p>{PROFILE.email}</p>
          <p>{PROFILE.contact}</p>
          <p>{PROFILE.location}</p>
        </div>
      </div>
    </div>
  );
}
