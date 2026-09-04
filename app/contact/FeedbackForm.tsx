"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import styles from "./feedback-form.module.css";

type InitialType = "feedback" | "careers";

type FormState = "idle" | "sending" | "success" | "not-configured" | "error";

export default function FeedbackForm({ initialType = "feedback" }: { initialType?: InitialType }) {
  const [state, setState] = useState<FormState>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = (await response.json()) as { ok?: boolean; delivered?: boolean };

      if (response.ok && result.ok && result.delivered) {
        setState("success");
        form.reset();
        return;
      }
      if (response.ok && result.ok && !result.delivered) {
        setState("not-configured");
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}>
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required placeholder="you@email.com" />
        </label>
      </div>

      <div className={styles.row}>
        <label>
          <span>What is this about?</span>
          <select name="type" defaultValue={initialType}>
            <option value="feedback">Feedback</option>
            <option value="compliment">A compliment</option>
            <option value="visit">A recent visit</option>
            <option value="careers">Careers / joining the team</option>
            <option value="collaboration">Collaboration</option>
            <option value="other">Something else</option>
          </select>
        </label>
        <label>
          <span>Phone <em>optional</em></span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+91" />
        </label>
      </div>

      <label>
        <span>Message</span>
        <textarea name="message" required minLength={10} maxLength={3000} rows={7} placeholder="Tell us what happened, what you loved, what we can do better—or why you want to work with us." />
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        <span>Company website</span>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className={styles.actions}>
        <button type="submit" disabled={state === "sending"}>
          {state === "sending" ? <LoaderCircle className={styles.spinner} size={17} aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}
          {state === "sending" ? "Sending" : "Send to Mokai"}
        </button>
        <p>By sending this form, you are sharing these details with Mokai for the purpose of responding to your message.</p>
      </div>

      <div className={styles.status} aria-live="polite">
        {state === "success" && <p className={styles.success}><Check size={16} /> Thank you. Your message has been sent.</p>}
        {state === "not-configured" && <p>Form delivery is ready but the inbox connection has not been configured yet. You can still reach Mokai on the phone numbers alongside this form.</p>}
        {state === "error" && <p>That did not go through. Please try again, or use the phone details alongside this form.</p>}
      </div>
    </form>
  );
}
