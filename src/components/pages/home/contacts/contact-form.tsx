"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui";

type T = {
  title: string; nameLabel: string; emailLabel: string; phoneLabel: string;
  messageLabel: string; privacyText: string; privacyLink: string;
  channelLabel: string; submit: string; success: string;
  errorRequired: string; errorEmail: string;
  chTelegram: string; chWhatsapp: string; chViber: string; chPhone: string; chEmail: string;
};

const CHANNELS = [
  {
    id: "telegram",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M21.8 4.2L2.8 11.6c-1.3.5-1.3 1.3-.2 1.6l4.8 1.5 1.9 5.8c.3.8.5 1.1 1.1 1.1.5 0 .7-.2 1-.5l2.4-2.3 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.2-.5-1.8-1.6-1.6z" fill="#29B6F6"/>
      </svg>
    ),
  },
  {
    id: "whatsapp",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L9.3 7.5c-.2-.6-.4-.5-.6-.5H8c-.2 0-.5.1-.8.4C6.9 7.7 6 8.6 6 10.4s1.3 3.6 1.5 3.9c.2.3 2.6 4 6.3 5.6.9.4 1.5.6 2.1.7.9.2 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.3L2 22l4.8-1.4C8.3 21.5 10.1 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" fill="#25D366"/>
      </svg>
    ),
  },
  {
    id: "viber",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M18.1 2.5H5.9C3.7 2.5 2 4.2 2 6.4v7.2c0 2 1.5 3.7 3.4 3.9v3.3l3.3-3.3h9.4c2.2 0 3.9-1.7 3.9-3.9V6.4c0-2.2-1.7-3.9-3.9-3.9zM12 15c-.5 0-1-.1-1.5-.3l-2.3.7.7-2.1c-.4-.6-.6-1.3-.6-2 0-2.1 1.7-3.8 3.7-3.8S15.7 9.9 15.7 12 14 15 12 15z" fill="#7360F2"/>
      </svg>
    ),
  },
  {
    id: "phone",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" fill="white" fillOpacity="0.7"/>
      </svg>
    ),
  },
  {
    id: "email",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335"/>
      </svg>
    ),
  },
];

export function ContactForm({ t }: { t: T }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [channel, setChannel] = useState("telegram");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const chLabels: Record<string, string> = {
    telegram: t.chTelegram, whatsapp: t.chWhatsapp,
    viber: t.chViber, phone: t.chPhone, email: t.chEmail,
  };

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t.errorRequired;
    if (!email.trim()) e.email = t.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t.errorEmail;
    return e;
  }

  function handleSubmit(ev: React.SyntheticEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="mb-8 md:mb-10 uppercase leading-tight text-[#D4AF37] font-display text-[clamp(24px,4vw,50px)] font-normal">
        {t.title}
      </h2>

      {/* Name + Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6">
        <div className="flex flex-col gap-1">
          <label className={cn("font-sans text-[13px]", errors.name ? "text-[#D4AF37]" : "text-white/55")}>
            {t.nameLabel}
          </label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            className={cn("bg-transparent outline-none w-full text-white font-sans text-[14px] py-2 border-b", errors.name ? "border-[#D4AF37]" : "border-white/25")}
          />
          {errors.name && <span className="text-[#ff4444] text-[11px] font-sans">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className={cn("font-sans text-[13px]", errors.email ? "text-[#D4AF37]" : "text-white/55")}>
            {t.emailLabel}
          </label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            className={cn("bg-transparent outline-none w-full text-white font-sans text-[14px] py-2 border-b", errors.email ? "border-[#D4AF37]" : "border-white/25")}
          />
          {errors.email && <span className="text-[#ff4444] text-[11px] font-sans">{errors.email}</span>}
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="font-sans text-[13px] text-white/55">{t.phoneLabel}</label>
        <input
          type="tel" value={phone} onChange={e => setPhone(e.target.value)}
          className="bg-transparent outline-none w-full text-white font-sans text-[14px] py-2 border-b border-white/25"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1 mb-8">
        <label className="font-sans text-[13px] text-white/55">{t.messageLabel}</label>
        <textarea
          rows={2} value={message} onChange={e => setMessage(e.target.value)}
          className="bg-transparent outline-none w-full text-white font-sans text-[14px] py-2 border-b border-white/25 resize-none"
        />
      </div>

      {/* Privacy */}
      <div className="flex items-center gap-2 mb-8">
        <button
          type="button" onClick={() => setPrivacy(!privacy)}
          className="shrink-0 w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center"
        >
          {privacy && <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />}
        </button>
        <span className="font-sans text-[13px] text-white/55">
          {t.privacyText}{" "}
          <Link href="/privacy" className="text-[#D4AF37] underline">{t.privacyLink}</Link>
        </span>
      </div>

      {/* Channel select */}
      <div className="mb-8">
        <p className="mb-4 font-sans text-[13px] text-white/55">{t.channelLabel}</p>
        <div className="flex flex-wrap gap-3">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id} type="button" onClick={() => setChannel(ch.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 px-3 py-2.5 min-w-18 transition-colors duration-200 border",
                channel === ch.id ? "border-[rgba(212,175,55,0.7)] bg-[rgba(212,175,55,0.05)]" : "border-white/15 bg-transparent"
              )}
            >
              {ch.icon}
              <span className="text-white/60 text-[11px] font-sans">{chLabels[ch.id]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit row */}
      <div className="flex items-center flex-wrap gap-5">
        <CTAButton type="submit">{t.submit}</CTAButton>
        {submitted && (
          <div className="flex items-center gap-2 text-white/75 font-sans text-[13px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.success}
          </div>
        )}
      </div>
    </form>
  );
}