"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { CTAButton } from "@/components/ui";
import { GiftIcon } from "@/components/icons/gift-icon";

type Props = { onClose: () => void };

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
      <span className={`w-3.75 h-3.75 shrink-0 rounded-[9px] border-[0.75px] border-[#D4AF37] flex items-center justify-center transition-colors duration-150 ${checked ? "bg-[#D4AF37]" : "bg-transparent"}`}>
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
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none" className={className}>
      <path d="M13.2583 4.99262C13.5511 5.28551 13.5511 5.76039 13.2583 6.05328L8.48528 10.8263C8.19239 11.1191 7.71751 11.1191 7.42462 10.8263C7.13173 10.5334 7.13173 10.0585 7.42462 9.76559L11.6673 5.52295L7.42462 1.28031C7.13173 0.987416 7.13173 0.512542 7.42462 0.219649C7.71752 -0.0732444 8.19239 -0.0732443 8.48528 0.219649L13.2583 4.99262ZM0 5.52295L6.55671e-08 4.77295L12.7279 4.77295L12.7279 5.52295L12.7279 6.27295L-6.55671e-08 6.27295L0 5.52295Z" fill="currentColor"/>
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

export function QuizModal({ onClose }: Props) {
  const t = useTranslations("quiz");
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function goForward() {
    if (step < TOTAL_STEPS) {
      if (selected) setAnswers((prev) => ({ ...prev, [step]: selected }));
      setStep(step + 1);
      setSelected(null);
    } else {
      onClose();
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
    await fetch("/api/quiz", {
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

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>

      {/* Modal card */}
      <div
        className={`relative overflow-hidden border border-[rgba(212,175,55,0.55)] flex flex-col ${submitted ? "w-full max-w-116.5 p-12.5 items-center gap-5" : "w-full max-w-177.5 p-7.5 md:p-12.5 items-end gap-10"}`}
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
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {submitted ? (
          /* Success screen */
          <div className="relative z-10 w-full flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none" className="mb-3.5">
              <g clipPath="url(#clip0_success)">
                <g filter="url(#filter0_success)">
                  <path d="M47.9902 39.512C47.6478 39.849 47.3913 40.2634 47.2426 40.7202C47.0939 41.1771 47.0573 41.663 47.1358 42.137L48.6594 51.0311C49.0917 53.4605 46.5491 55.2929 44.3667 54.1708L36.3888 49.9502C35.5138 49.4973 34.4844 49.4973 33.6197 49.9502L25.6314 54.1708C24.777 54.6135 23.8608 54.5929 23.0888 54.2635C21.9152 53.7591 21.0814 52.5032 21.3388 51.0311L21.8741 47.9017L22.8623 42.137C22.9408 41.663 22.9042 41.1771 22.7555 40.7202C22.6068 40.2634 22.3504 39.849 22.0079 39.512L15.5329 33.2017C13.7829 31.4929 14.7505 28.5179 17.1697 28.1576L26.1255 26.8605C27.0932 26.7267 27.9064 26.1194 28.3491 25.2341L32.3535 17.1429C33.4344 14.9399 36.5638 14.9399 37.6446 17.1429L39.0961 20.087L41.6491 25.2341C41.7829 25.5017 41.9579 25.7488 42.1432 25.9547C42.5961 26.4488 43.2035 26.7576 43.8726 26.8605L52.8285 28.1576C55.2476 28.5179 56.2152 31.4929 54.4652 33.2017L47.9902 39.512ZM36.4907 2.67657C36.8613 3.04716 37.097 3.57936 37.097 4.1723V9.27304C37.097 9.86701 36.8623 10.3982 36.4907 10.7698C36.2135 11.0482 35.8638 11.2432 35.4813 11.3327C35.0987 11.4223 34.6988 11.4027 34.3269 11.2763C33.4488 10.9675 32.9042 10.0894 32.9042 9.16186V4.28451C32.9042 3.35701 33.4488 2.47892 34.3269 2.16907C34.6989 2.04278 35.0989 2.02338 35.4814 2.1131C35.8639 2.20281 36.2136 2.39803 36.4907 2.67657ZM36.4907 59.2304C36.8613 59.601 37.097 60.1332 37.097 60.7272V65.8269C37.097 66.4208 36.8623 66.953 36.4907 67.3236C36.2136 67.6022 35.8639 67.7974 35.4814 67.8871C35.0989 67.9768 34.6989 67.9574 34.3269 67.8311C33.4488 67.5223 32.9042 66.6442 32.9042 65.7157V60.8383C32.9042 59.9108 33.4488 59.0327 34.3269 58.7239C34.6988 58.5975 35.0987 58.5779 35.4813 58.6675C35.8638 58.757 36.2135 58.952 36.4907 59.2304ZM13.1992 11.093C13.7242 11.093 14.2657 11.303 14.6857 11.723L18.2917 15.3291C18.7117 15.7491 18.9217 16.2916 18.9217 16.8155C18.9217 17.568 18.5202 18.3195 17.7502 18.7045C16.9102 19.107 15.9045 18.8713 15.2488 18.2155L11.8002 14.767C11.1435 14.1102 10.9077 13.1045 11.3102 12.2655C11.4838 11.9129 11.7529 11.6161 12.0868 11.4088C12.4208 11.2015 12.8062 11.0921 13.1992 11.093ZM53.1877 51.0805C53.7127 51.0805 54.2542 51.2905 54.6742 51.7105L58.2802 55.3166C58.7002 55.7366 58.9102 56.2791 58.9102 56.803C58.9102 57.5545 58.5088 58.307 57.7377 58.692C56.8988 59.0945 55.893 58.8588 55.2363 58.202L51.7877 54.7535C51.132 54.0977 50.8963 53.092 51.2988 52.252C51.4725 51.8996 51.7416 51.603 52.0756 51.3959C52.4095 51.1888 52.7948 51.0795 53.1877 51.0805ZM2.68068 33.5147C3.05127 33.1441 3.58348 32.9083 4.17745 32.9083H9.27715C9.83658 32.9037 10.375 33.1214 10.7739 33.5136C11.0525 33.7909 11.2476 34.1408 11.3371 34.5235C11.4267 34.9062 11.407 35.3064 11.2804 35.6785C10.9716 36.5566 10.0935 37.1011 9.16598 37.1011H4.28862C3.36112 37.1011 2.48303 36.5566 2.17421 35.6785C2.04779 35.3065 2.02823 34.9066 2.11776 34.5241C2.20729 34.1416 2.40232 33.7919 2.68068 33.5147ZM59.2304 33.5126C59.601 33.142 60.1332 32.9063 60.7271 32.9063H65.8269C66.3863 32.9017 66.9247 33.1194 67.3236 33.5116C67.6022 33.7889 67.7973 34.1388 67.8868 34.5215C67.9764 34.9042 67.9567 35.3043 67.8301 35.6764C67.5213 36.5545 66.6432 37.098 65.7157 37.098H60.8383C59.9119 37.098 59.0327 36.5545 58.7239 35.6775C58.5973 35.3054 58.5776 34.9052 58.6672 34.5225C58.7567 34.1398 58.9518 33.7899 59.2304 33.5126ZM11.0972 56.8051C11.0972 56.2801 11.3072 55.7386 11.7272 55.3186L15.3322 51.7126C15.7245 51.3139 16.2592 51.0873 16.8186 51.0826C17.5711 51.0826 18.3226 51.4841 18.7076 52.2541C19.1101 53.093 18.8744 54.0988 18.2186 54.7555L14.7701 58.2041C14.1144 58.8598 13.1086 59.0955 12.2686 58.6941C11.9162 58.5203 11.6196 58.2512 11.4125 57.9173C11.2054 57.5834 11.0961 57.198 11.0972 56.8051ZM51.0816 16.8166C51.0816 16.2916 51.2916 15.7501 51.7116 15.3311L55.3176 11.7241C55.71 11.3253 56.2447 11.0987 56.8041 11.0941C57.5555 11.0941 58.307 11.4966 58.693 12.2666C59.0945 13.1055 58.8588 14.1113 58.203 14.768L54.7545 18.2166C54.0988 18.8723 53.093 19.108 52.253 18.7055C51.9006 18.5318 51.604 18.2627 51.3969 17.9288C51.1898 17.5948 51.0805 17.2095 51.0816 16.8166Z" fill="#FFD80C"/>
                </g>
                <g filter="url(#filter1_success)">
                  <path d="M47.9913 39.5119C47.6488 39.8489 47.3924 40.2633 47.2437 40.7201C47.095 41.177 47.0584 41.6629 47.1369 42.1369L48.6604 51.031C49.0928 53.4604 46.5501 55.2928 44.3678 54.1707L36.3898 49.9501C35.5148 49.4972 34.4854 49.4972 33.6207 49.9501L25.6325 54.1707C24.7781 54.6134 23.8619 54.5928 23.0898 54.2634C31.0143 44.0825 36.9653 32.9793 39.0972 20.0869L41.6501 25.234C41.784 25.5016 41.959 25.7487 42.1443 25.9546C42.5972 26.4487 43.2046 26.7575 43.8737 26.8604L52.8296 28.1575C55.2487 28.5178 56.2163 31.4928 54.4663 33.2016L47.9913 39.5119Z" fill="#FFBE00"/>
                </g>
              </g>
              <defs>
                <filter id="filter0_success" x="-10.2575" y="-10.2624" width="90.5189" height="90.5248" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="6.16"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.854902 0 0 0 0 0.388235 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_80769"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_80769" result="shape"/>
                </filter>
                <filter id="filter1_success" x="10.7698" y="7.76691" width="56.9095" height="59.0619" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="6.16"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.854902 0 0 0 0 0.388235 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_80769"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_80769" result="shape"/>
                </filter>
                <clipPath id="clip0_success">
                  <rect width="70" height="70" fill="white"/>
                </clipPath>
              </defs>
            </svg>

            <h2 className="font-display uppercase text-[32px] font-normal leading-normal text-[#D4AF37] mb-3">
              {t("successTitle")}
            </h2>
            <p className="font-sans text-[14px] font-medium text-[#D9D9D9] text-center leading-[130%] mb-5">
              {t("successDesc")}
            </p>
            <div className="flex items-center justify-center gap-1.5 border border-[#D4AF37] bg-[rgba(12,12,12,0.10)] backdrop-blur-[25px] px-3.5 py-2.5 mb-5">
              <span className="w-5.5 h-5.5 flex items-center justify-center shrink-0 rounded-[6.6px] [background:linear-gradient(90deg,#d4af37_0%,#ffda63_100%)] [box-shadow:0_0_21px_0_#ffda63] p-[2.75px]">
                <GiftIcon size={16} />
              </span>
              <span className="font-sans text-[14px] font-medium text-[#D9D9D9] text-center leading-[130%]">
                {t("successGift")}
              </span>
            </div>
            <CTAButton onClick={onClose} className="w-full justify-between gap-4">
              {t("successReturn")}
            </CTAButton>
          </div>
        ) : (
          <>

        {/* Question */}
        <h2 className="relative z-10 w-full font-display uppercase text-[22px] md:text-[32px] font-normal leading-normal text-[#D4AF37]">
          {stepQuestion[step]}
        </h2>

        {/* Content */}
        {step === 3 ? (
          <div className="relative z-10 flex flex-col gap-6 self-stretch">
            <UnderlineInput placeholder={t("s4name")} value={name} onChange={setName} />
            <div className="flex flex-col gap-1">
              <UnderlineInput
                placeholder={t("s4phone")}
                value={phone}
                onChange={(v) => { setPhone(v); setPhoneError(false); }}
                type="tel"
              />
              {phoneError && (
                <span className="font-sans text-[12px] text-red-400 leading-normal">
                  {t("phoneRequired")}
                </span>
              )}
            </div>
            <UnderlineInput placeholder={t("s4email")} value={email} onChange={setEmail} type="email" />
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

        {/* Navigation */}
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
