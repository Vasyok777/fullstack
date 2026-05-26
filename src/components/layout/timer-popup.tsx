"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { CTAButton } from "@/components/ui";

function RadioOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer" onClick={onChange}>
      <span
        className={`w-3.75 h-3.75 shrink-0 rounded-[9px] border-[0.75px] border-[#D4AF37] flex items-center justify-center transition-colors duration-150 ${
          checked ? "bg-[#D4AF37]" : "bg-transparent"
        }`}
      >
        {checked && <span className="w-0.75 h-0.75 shrink-0 rounded-full bg-white" />}
      </span>
      <span className="font-sans text-[15px] font-light text-[#D9D9D9] leading-normal">
        {label}
      </span>
    </label>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      className={className}
    >
      <path
        d="M13.2583 4.99262C13.5511 5.28551 13.5511 5.76039 13.2583 6.05328L8.48528 10.8263C8.19239 11.1191 7.71751 11.1191 7.42462 10.8263C7.13173 10.5334 7.13173 10.0585 7.42462 9.76559L11.6673 5.52295L7.42462 1.28031C7.13173 0.987416 7.13173 0.512542 7.42462 0.219649C7.71752 -0.0732444 8.19239 -0.0732443 8.48528 0.219649L13.2583 4.99262ZM0 5.52295L6.55671e-08 4.77295L12.7279 4.77295L12.7279 5.52295L12.7279 6.27295L-6.55671e-08 6.27295L0 5.52295Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UnderlineInput({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="self-stretch bg-transparent border-b border-white/30 text-white font-sans text-[15px] font-light placeholder:text-white/40 outline-none py-2"
    />
  );
}

const TOTAL_STEPS = 3;

export function TimerPopup() {
  const t = useTranslations("quiz");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sessionStorage.getItem("quiz_opened")) return;
      const submitted = localStorage.getItem("quiz_submitted");
      if (submitted && Date.now() - Number(submitted) < 7 * 24 * 60 * 60 * 1000) return;
      setOpen(true);
    }, 35000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const stepQuestion: Record<number, string> = {
    1: t("s1q"),
    2: t("s2q"),
    3: t("s4q"),
  };

  const stepOptions: Record<number, string[]> = {
    1: [t("s1o1"), t("s1o2"), t("s1o3"), t("s1o4")],
    2: [t("s2o1"), t("s2o2"), t("s2o3"), t("s2o4"), t("s2o5")],
  };

  const canGoForward = selected !== null;

  function goForward() {
    if (step < TOTAL_STEPS) {
      if (selected) setAnswers((prev) => ({ ...prev, [step]: selected }));
      setStep(step + 1);
      setSelected(null);
    }
  }

  function goBack() {
    setStep(step - 1);
    setSelected(null);
  }

  async function handleSend() {
    const digits = phone.replace(/\D/g, "");
    if (!phone.trim() || digits.length < 7 || digits.length > 15) {
      setPhoneError(true);
      return;
    }
    setSubmitted(true);
    localStorage.setItem("quiz_submitted", String(Date.now()));
    await fetch("/api/quiz-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteType: answers[1] || "—",
        timeline: answers[2] || "—",
        name: name || "—",
        phone,
        email: email || "—",
      }),
    }).catch(() => {});
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className={`relative overflow-hidden border border-[rgba(212,175,55,0.55)] flex flex-col ${
          submitted
            ? "w-full max-w-116.5 p-12.5 items-center gap-5"
            : "w-full max-w-177.5 p-7.5 md:p-12.5 items-end gap-10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover grayscale pointer-events-none"
          src="/modal-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="relative z-10 w-full flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              className="mb-3.5"
            >
              <g clipPath="url(#clip0_timer_success)">
                <g filter="url(#filter0_timer_success)">
                  <path
                    d="M47.9902 39.512C47.6478 39.849 47.3913 40.2634 47.2426 40.7202C47.0939 41.1771 47.0573 41.663 47.1358 42.137L48.6594 51.0311C49.0917 53.4605 46.5491 55.2929 44.3667 54.1708L36.3888 49.9502C35.5138 49.4973 34.4844 49.4973 33.6197 49.9502L25.6314 54.1708C24.777 54.6135 23.8608 54.5929 23.0888 54.2635C21.9152 53.7591 21.0814 52.5032 21.3388 51.0311L21.8741 47.9017L22.8623 42.137C22.9408 41.663 22.9042 41.1771 22.7555 40.7202C22.6068 40.2634 22.3504 39.849 22.0079 39.512L15.5329 33.2017C13.7829 31.4929 14.7505 28.5179 17.1697 28.1576L26.1255 26.8605C27.0932 26.7267 27.9064 26.1194 28.3491 25.2341L32.3535 17.1429C33.4344 14.9399 36.5638 14.9399 37.6446 17.1429L39.0961 20.087L41.6491 25.2341C41.7829 25.5017 41.9579 25.7488 42.1432 25.9547C42.5961 26.4488 43.2035 26.7576 43.8726 26.8605L52.8285 28.1576C55.2476 28.5179 56.2152 31.4929 54.4652 33.2017L47.9902 39.512Z"
                    fill="#FFD80C"
                  />
                </g>
                <g filter="url(#filter1_timer_success)">
                  <path
                    d="M47.9913 39.5119C47.6488 39.8489 47.3924 40.2633 47.2437 40.7201C47.095 41.177 47.0584 41.6629 47.1369 42.1369L48.6604 51.031C49.0928 53.4604 46.5501 55.2928 44.3678 54.1707L36.3898 49.9501C35.5148 49.4972 34.4854 49.4972 33.6207 49.9501L25.6325 54.1707C24.7781 54.6134 23.8619 54.5928 23.0898 54.2634C31.0143 44.0825 36.9653 32.9793 39.0972 20.0869L41.6501 25.234C41.784 25.5016 41.959 25.7487 42.1443 25.9546C42.5972 26.4487 43.2046 26.7575 43.8737 26.8604L52.8296 28.1575C55.2487 28.5178 56.2163 31.4928 54.4663 33.2016L47.9913 39.5119Z"
                    fill="#FFBE00"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_timer_success"
                  x="-10.2575"
                  y="-10.2624"
                  width="90.5189"
                  height="90.5248"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="6.16" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 0.854902 0 0 0 0 0.388235 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_timer_success"
                  x="10.7698"
                  y="7.76691"
                  width="56.9095"
                  height="59.0619"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="6.16" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 0.854902 0 0 0 0 0.388235 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_timer_success">
                  <rect width="70" height="70" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <h2 className="font-display uppercase text-[32px] font-normal leading-normal text-[#D4AF37] mb-3">
              {t("successTitle")}
            </h2>
            <p className="font-sans text-[14px] font-medium text-[#D9D9D9] text-center leading-[130%] mb-5">
              {t("successDesc")}
            </p>
            <CTAButton onClick={() => setOpen(false)} className="w-full justify-between gap-4">
              {t("successReturn")}
            </CTAButton>
          </div>
        ) : (
          <>
            <h2 className="relative z-10 w-full font-display uppercase text-[22px] md:text-[32px] font-normal leading-normal text-[#D4AF37]">
              {stepQuestion[step]}
            </h2>

            {step === 3 ? (
              <div className="relative z-10 flex flex-col gap-6 self-stretch">
                <UnderlineInput
                  placeholder={t("s4name")}
                  value={name}
                  onChange={setName}
                />
                <div className="flex flex-col gap-1">
                  <UnderlineInput
                    placeholder={t("s4phone")}
                    value={phone}
                    onChange={(v) => {
                      setPhone(v);
                      setPhoneError(false);
                    }}
                    type="tel"
                  />
                  {phoneError && (
                    <span className="font-sans text-[12px] text-red-400 leading-normal">
                      {t("phoneRequired")}
                    </span>
                  )}
                </div>
                <UnderlineInput
                  placeholder={t("s4email")}
                  value={email}
                  onChange={setEmail}
                  type="email"
                />
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-start gap-4 self-stretch">
                {stepOptions[step].map((opt) => (
                  <RadioOption
                    key={opt}
                    label={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                  />
                ))}
              </div>
            )}

            {step === 3 ? (
              <div className="relative z-10 flex flex-col items-start gap-10 w-full">
                <CTAButton onClick={handleSend}>{t("send")}</CTAButton>
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 font-sans text-[15px] font-medium text-white transition-colors cursor-pointer hover:text-[#D4AF37]"
                >
                  <ArrowIcon className="scale-x-[-1]" />
                  {t("back")}
                </button>
              </div>
            ) : (
              <div className="relative z-10 flex w-full items-center justify-between">
                {step > 1 ? (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 font-sans text-[15px] font-medium text-white transition-colors cursor-pointer hover:text-[#D4AF37]"
                  >
                    <ArrowIcon className="scale-x-[-1]" />
                    {t("back")}
                  </button>
                ) : (
                  <span />
                )}
                <button
                  onClick={goForward}
                  disabled={!canGoForward}
                  className="flex items-center gap-2 font-sans text-[15px] font-medium text-white text-center disabled:text-white/30 transition-colors cursor-pointer hover:text-[#D4AF37] disabled:cursor-not-allowed"
                >
                  {t("forward")}
                  <ArrowIcon />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
