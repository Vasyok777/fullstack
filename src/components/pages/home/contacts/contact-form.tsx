"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui";

type T = {
  title: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  privacyText: string;
  privacyLink: string;
  channelLabel: string;
  submit: string;
  success: string;
  errorRequired: string;
  errorPrivacy: string;
  errorEmail: string;
  chTelegram: string;
  chWhatsapp: string;
  chViber: string;
  chPhone: string;
  chEmail: string;
};

const CHANNELS = [
  {
    id: "telegram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <g clipPath="url(#tg-clip)">
          <path
            d="M7.84765 12.651L7.51682 17.3043C7.99015 17.3043 8.19515 17.101 8.44098 16.8568L10.6601 14.736L15.2585 18.1035C16.1018 18.5735 16.696 18.326 16.9235 17.3277L19.9418 3.18434L19.9426 3.18351C20.2101 1.93684 19.4918 1.44934 18.6701 1.75518L0.928482 8.54768C-0.282352 9.01768 -0.264018 9.69268 0.722648 9.99851L5.25848 11.4093L15.7943 4.81684C16.2901 4.48851 16.741 4.67018 16.3701 4.99851L7.84765 12.651Z"
            fill="#039BE5"
          />
        </g>
        <defs>
          <clipPath id="tg-clip">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "whatsapp",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        aria-hidden
      >
        <g clipPath="url(#wa-clip)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.3876 11.1691C12.0091 11.3238 11.7673 11.9164 11.522 12.2191C11.3962 12.3742 11.2462 12.3984 11.0528 12.3207C9.63214 11.7547 8.54307 10.8066 7.75909 9.49922C7.62628 9.29648 7.6501 9.13633 7.81026 8.94805C8.04698 8.66914 8.34464 8.35234 8.4087 7.97656C8.55089 7.14531 7.46417 4.5668 6.02901 5.73516C1.89932 9.10039 12.9181 18.0258 14.9067 13.1984C15.4692 11.8301 13.0149 10.9121 12.3876 11.1691ZM10.0001 18.2531C8.53956 18.2531 7.10245 17.8648 5.84425 17.1297C5.64229 17.0113 5.39815 16.9801 5.17237 17.0414L2.43839 17.7918L3.39073 15.6938C3.52042 15.4082 3.48721 15.0758 3.30401 14.8219C2.28526 13.4098 1.74659 11.7426 1.74659 10C1.74659 5.44883 5.44893 1.74648 10.0001 1.74648C14.5513 1.74648 18.2532 5.44883 18.2532 10C18.2532 14.5508 14.5509 18.2531 10.0001 18.2531ZM10.0001 0C4.48604 0 0.000104544 4.48594 0.000104544 10C0.000104544 11.9398 0.550886 13.8027 1.59737 15.4195L0.0782295 18.7652C-0.0620048 19.0742 -0.0108329 19.4359 0.208698 19.6934C0.377448 19.8906 0.621589 20 0.873542 20C1.43682 20 4.50831 19.0348 5.28995 18.8203C6.73487 19.5934 8.35557 20 10.0001 20C15.5138 20 20.0001 15.5137 20.0001 10C20.0001 4.48594 15.5138 0 10.0001 0Z"
            fill="#39AE41"
          />
        </g>
        <defs>
          <clipPath id="wa-clip">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "viber",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
      >
        <path
          d="M13.628 2H9.76329C6.01747 2 3 5.12308 3 9V12C3 14.7077 4.5013 17.1692 6.86473 18.3231V21.6769C6.86473 21.8462 7.01338 22 7.20661 22C7.28094 22 7.37012 21.9692 7.42958 21.9077L10.2241 19H13.628C17.3738 19 20.3913 15.8769 20.3913 12V9C20.3913 5.12308 17.3738 2 13.628 2ZM16.1698 15.1231L15.2036 16.1231C14.1631 17.1692 11.4876 15.9692 9.12412 13.4769C6.76068 10.9846 5.70531 8.16923 6.70123 7.12308L7.66741 6.12308C8.05388 5.75385 8.66332 5.76923 9.0498 6.15385L10.447 7.66154C10.8038 8.06154 10.8038 8.66154 10.4173 9.06154C10.3133 9.16923 10.1944 9.23077 10.0606 9.29231C9.57005 9.44615 9.31735 9.93846 9.43627 10.4462C9.6741 11.5538 11.0268 12.9385 12.0524 13.2154C12.5281 13.3385 13.0186 13.0615 13.1821 12.5846C13.3456 12.0923 13.8807 11.8154 14.3861 11.9846C14.5347 12.0308 14.6537 12.1385 14.7726 12.2308L16.1698 13.7385C16.5266 14.1077 16.5266 14.7231 16.1698 15.1231ZM12.5578 6.75385C12.4537 6.75385 12.3645 6.75385 12.2754 6.78462C12.1119 6.81538 11.9335 6.67692 11.9186 6.47692C11.9038 6.27692 12.0227 6.12308 12.201 6.10769C12.32 6.07692 12.4389 6.07692 12.5578 6.07692C14.3415 6.07692 15.7685 7.58462 15.7982 9.4C15.7982 9.52308 15.7982 9.64615 15.7685 9.76923C15.7388 9.93846 15.605 10.0923 15.4117 10.0615C15.2185 10.0308 15.0996 9.89231 15.1293 9.69231C15.1293 9.58462 15.159 9.49231 15.159 9.4C15.1442 7.95385 13.9848 6.75385 12.5578 6.75385ZM14.4902 9.43077C14.4604 9.6 14.3266 9.75385 14.1334 9.72308C13.9848 9.69231 13.851 9.56923 13.851 9.43077C13.851 8.70769 13.2713 8.10769 12.5726 8.10769C12.4091 8.13846 12.2308 7.98462 12.2159 7.8C12.1862 7.63077 12.3348 7.44615 12.4983 7.43077H12.5429C13.6577 7.43077 14.4902 8.32308 14.4902 9.43077ZM16.9576 10.4923C16.9279 10.6615 16.7644 10.7846 16.6009 10.7692C16.4374 10.7538 16.3185 10.5692 16.3333 10.4C16.3333 10.3692 16.3333 10.3692 16.3333 10.3538C16.4077 10.0615 16.4374 9.75385 16.4374 9.43077C16.4374 7.23077 14.6983 5.43077 12.5726 5.43077C12.4686 5.43077 12.3794 5.43077 12.2902 5.43077C12.1267 5.46154 11.9483 5.30769 11.9483 5.12308C11.9186 4.95385 12.0673 4.76923 12.2308 4.76923C12.3497 4.76923 12.4686 4.73846 12.5726 4.73846C15.055 4.73846 17.0914 6.83077 17.0914 9.41539C17.0766 9.76923 17.032 10.1538 16.9576 10.4923Z"
          fill="url(#viber-grad)"
        />
        <defs>
          <linearGradient
            id="viber-grad"
            x1="4.51943"
            y1="4.52108"
            x2="17.9178"
            y2="17.4664"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7E57C2" />
            <stop offset="1" stopColor="#4527A0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "phone",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <g clipPath="url(#ph-clip)">
          <path
            d="M15.2051 13.2302C14.5517 12.5851 13.736 12.5851 13.0867 13.2302C12.5915 13.7213 12.0962 14.2124 11.6093 14.7118C11.4761 14.8491 11.3638 14.8782 11.2014 14.7867C10.881 14.6119 10.5397 14.4704 10.2317 14.2789C8.79592 13.3758 7.59315 12.2147 6.52773 10.9079C5.99918 10.2586 5.52889 9.56361 5.20011 8.78119C5.13352 8.62304 5.14601 8.51899 5.27502 8.38998C5.77028 7.91137 6.25305 7.42028 6.73998 6.92918C7.41836 6.24665 7.41836 5.44758 6.73582 4.76088C6.34877 4.36967 5.96172 3.98678 5.57467 3.59557C5.17514 3.19604 4.77977 2.79234 4.37607 2.39697C3.72267 1.76021 2.90695 1.76021 2.25771 2.40113C1.75829 2.89223 1.27968 3.39581 0.771944 3.87858C0.301659 4.32389 0.0644358 4.86909 0.014494 5.50584C-0.0645804 6.54213 0.18929 7.52016 0.547206 8.47322C1.27968 10.4459 2.39505 12.198 3.74764 13.8045C5.57467 15.977 7.75546 17.6958 10.3067 18.936C11.4553 19.4937 12.6456 19.9224 13.9399 19.9931C14.8305 20.043 15.6046 19.8183 16.2247 19.1233C16.6493 18.6488 17.1279 18.216 17.5773 17.7624C18.2432 17.0882 18.2474 16.2724 17.5857 15.6066C16.7949 14.8117 16 14.0209 15.2051 13.2302Z"
            fill="#39AE41"
          />
          <path
            d="M14.4098 9.91321L15.9455 9.65102C15.7042 8.24016 15.0383 6.96249 14.027 5.94701C12.9574 4.87742 11.6048 4.20321 10.1149 3.99512L9.89844 5.53915C11.0513 5.70146 12.1 6.22169 12.9282 7.04989C13.7107 7.83231 14.2226 8.82282 14.4098 9.91321Z"
            fill="#39AE41"
          />
          <path
            d="M16.8104 3.23789C15.0375 1.46496 12.7943 0.34543 10.318 0L10.1016 1.54403C12.2407 1.84368 14.1801 2.81338 15.7117 4.34077C17.1642 5.79324 18.1172 7.6286 18.4626 9.64708L19.9983 9.38488C19.5947 7.04595 18.4918 4.92342 16.8104 3.23789Z"
            fill="#39AE41"
          />
        </g>
        <defs>
          <clipPath id="ph-clip">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "email",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="17"
        viewBox="0 0 22 17"
        fill="none"
      >
        <path
          d="M18.1329 16.022H1.86693C1.22572 16.022 0.705878 15.5022 0.705878 14.8609L0 1.16105C0 0.519801 0.51984 0 1.16105 0H18.8388C19.48 0 19.9998 0.51984 19.9998 1.16105L19.294 14.8609C19.294 15.5022 18.7742 16.022 18.1329 16.022Z"
          fill="url(#paint0_linear_2053_611)"
        />
        <path
          d="M18.8388 16.0217H1.16105C0.51984 16.0217 0 15.5018 0 14.8606C0 14.5368 0.133725 14.2273 0.369527 14.0054L9.0983 5.79112C9.60488 5.31442 10.395 5.31442 10.9016 5.79112L19.6303 14.0054C19.8662 14.2273 19.9999 14.5368 19.9999 14.8606C19.9999 15.5018 19.48 16.0217 18.8388 16.0217Z"
          fill="url(#paint1_linear_2053_611)"
        />
        <path
          d="M0.167969 11.853V14.8613C0.167969 15.5025 0.679181 16.0223 1.30977 16.0223H18.6939C19.3245 16.0223 19.8357 15.5025 19.8357 14.8613V11.853H0.167969Z"
          fill="url(#paint2_linear_2053_611)"
        />
        <path
          d="M0 1.16109V14.861C0 15.5022 0.51984 16.022 1.16105 16.022H1.91242V0H1.16105C0.51984 0 0 0.51984 0 1.16109Z"
          fill="url(#paint3_linear_2053_611)"
        />
        <path
          d="M0.40859 2.01592L15.3723 16.0217H18.8387C19.4799 16.0217 19.9997 15.5018 19.9997 14.8606V1.16075C19.9997 0.519495 19.4799 0.078125 18.8387 0.078125H1.1609C0.519687 0.0780858 0.0390625 0.519495 0.0390625 1.16075C0.0390625 1.48455 0.172787 1.794 0.40859 2.01592Z"
          fill="url(#paint4_linear_2053_611)"
        />
        <path
          d="M19.9984 1.16109V14.861C19.9984 15.5022 19.4785 16.022 18.8373 16.022H18.0859V0H18.8373C19.4785 0 19.9984 0.51984 19.9984 1.16109Z"
          fill="url(#paint5_linear_2053_611)"
        />
        <path
          d="M18.8373 0.078125H18.0859V7.17596H19.9984V1.23922C19.9984 0.597965 19.4785 0.078125 18.8373 0.078125Z"
          fill="url(#paint6_linear_2053_611)"
        />
        <path
          d="M1.16105 0.078125H1.91242V7.17596H0V1.23922C0 0.597965 0.51984 0.078125 1.16105 0.078125Z"
          fill="url(#paint7_linear_2053_611)"
        />
        <path
          d="M18.8388 0H1.16105C0.51984 0 0 0.51984 0 1.16109C0 1.48493 0.133725 1.67673 0.369527 1.89865L9.0983 10.1129C9.60488 10.5896 10.395 10.5896 10.9016 10.1129L19.6303 1.89862C19.8661 1.6767 19.9999 1.48489 19.9999 1.16109C19.9999 0.51984 19.48 0 18.8388 0Z"
          fill="url(#paint8_linear_2053_611)"
        />
        <path
          d="M18.8146 0C18.7683 0 18.7239 0.0176469 18.6902 0.0492938L10.9016 7.37889C10.395 7.8556 9.60486 7.8556 9.09827 7.37889L1.30966 0.0493332C1.27601 0.0176471 1.2315 0 1.1853 0C0.592876 0 0.0775459 0.434468 0.00813462 1.02282C-0.0358259 1.39548 0.10033 1.76293 0.369544 2.01626L9.09831 10.2305C9.6049 10.7072 10.395 10.7072 10.9016 10.2305L19.6304 2.01626C19.8996 1.76289 20.0357 1.39548 19.9918 1.02282C19.9223 0.434468 19.407 0 18.8146 0Z"
          fill="url(#paint9_linear_2053_611)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2053_611"
            x1="8.58712"
            y1="4.22029"
            x2="14.9125"
            y2="17.7995"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E3E5E4" />
            <stop offset="1" stopColor="#CBD0E4" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2053_611"
            x1="8.11928"
            y1="12.9772"
            x2="11.3863"
            y2="16.2442"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EBEFF0" />
            <stop offset="1" stopColor="#E3E5E4" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2053_611"
            x1="10.0018"
            y1="13.5053"
            x2="10.0018"
            y2="16.8601"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CBD0E4" stopOpacity="0" />
            <stop offset="1" stopColor="#6A7D83" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2053_611"
            x1="0.679721"
            y1="8.01101"
            x2="2.27536"
            y2="8.01101"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF637B" />
            <stop offset="1" stopColor="#F90217" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_2053_611"
            x1="16.4687"
            y1="7.97349"
            x2="14.0112"
            y2="5.38527"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CBD0E4" stopOpacity="0" />
            <stop offset="1" stopColor="#6A7D83" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_2053_611"
            x1="18.9526"
            y1="8.01101"
            x2="20.1814"
            y2="8.01101"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF637B" />
            <stop offset="1" stopColor="#F90217" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_2053_611"
            x1="19.6363"
            y1="4.65967"
            x2="17.9892"
            y2="2.79693"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F90217" stopOpacity="0" />
            <stop offset="0.2669" stopColor="#E7010F" stopOpacity="0.267" />
            <stop offset="0.7232" stopColor="#CE0004" stopOpacity="0.723" />
            <stop offset="1" stopColor="#C50000" />
          </linearGradient>
          <linearGradient
            id="paint7_linear_2053_611"
            x1="0.362076"
            y1="4.65967"
            x2="2.00912"
            y2="2.79693"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F90217" stopOpacity="0" />
            <stop offset="0.2669" stopColor="#E7010F" stopOpacity="0.267" />
            <stop offset="0.7232" stopColor="#CE0004" stopOpacity="0.723" />
            <stop offset="1" stopColor="#C50000" />
          </linearGradient>
          <linearGradient
            id="paint8_linear_2053_611"
            x1="9.19234"
            y1="0.131097"
            x2="13.576"
            y2="5.44989"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EBEFF0" />
            <stop offset="1" stopColor="#E3E5E4" />
          </linearGradient>
          <linearGradient
            id="paint9_linear_2053_611"
            x1="10.2362"
            y1="1.56297"
            x2="15.3081"
            y2="10.1119"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF637B" />
            <stop offset="1" stopColor="#F90217" />
          </linearGradient>
        </defs>
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

  useEffect(() => {
    const handler = (e: Event) => setMessage((e as CustomEvent<string>).detail);
    window.addEventListener("prefill-contact", handler);
    return () => window.removeEventListener("prefill-contact", handler);
  }, []);

  const chLabels: Record<string, string> = {
    telegram: t.chTelegram,
    whatsapp: t.chWhatsapp,
    viber: t.chViber,
    phone: t.chPhone,
    email: t.chEmail,
  };

  const emailRequired = channel === "email";
  const phoneRequired = channel !== "email";

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t.errorRequired;
    if (emailRequired) {
      if (!email.trim()) e.email = t.errorRequired;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        e.email = t.errorEmail;
    }
    if (phoneRequired && !phone.trim()) e.phone = t.errorRequired;
    if (!privacy) e.privacy = t.errorPrivacy;
    return e;
  }

  const isFormFilled =
    name.trim() &&
    (emailRequired
      ? email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      : phone.trim()) &&
    privacy;

  async function handleSubmit(ev: React.SyntheticEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message, channel }),
    }).catch(() => {});

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setPrivacy(false);
    setChannel("telegram");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    if (
      typeof window !== "undefined" &&
      typeof (window as any).gtag === "function"
    ) {
      (window as any).gtag("event", "generate_lead");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="mb-8 md:mb-10 uppercase leading-tight text-[#D4AF37] font-display text-[clamp(24px,4vw,50px)] font-normal">
        {t.title}
      </h2>

      {/* Name + Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6">
        <div className="flex flex-col gap-1">
          <label
            className={cn(
              "font-sans text-[13px]",
              errors.name ? "text-[#D43737]" : "text-white/55",
            )}
          >
            {t.nameLabel}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
            className={cn(
              "bg-transparent outline-none w-full text-white font-sans text-[14px] h-7.5 border-b",
              errors.name ? "border-[#D43737]" : "border-white/25",
            )}
          />
          {errors.name && (
            <span className="text-[#ff4444] text-[11px] font-sans">
              {errors.name}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            className={cn(
              "font-sans text-[13px]",
              errors.email ? "text-[#D43737]" : "text-white/55",
            )}
          >
            {t.emailLabel}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className={cn(
              "bg-transparent outline-none w-full text-white font-sans text-[14px] h-7.5 border-b",
              errors.email ? "border-[#D43737]" : "border-white/25",
            )}
          />
          {errors.email && (
            <span className="text-[#ff4444] text-[11px] font-sans">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1 mb-6">
        <label
          className={cn(
            "font-sans text-[13px]",
            errors.phone ? "text-[#D43737]" : "text-white/55",
          )}
        >
          {t.phoneLabel}
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setErrors((prev) => ({ ...prev, phone: "" }));
          }}
          className={cn(
            "bg-transparent outline-none w-full text-white font-sans text-[14px] h-7.5 border-b",
            errors.phone ? "border-[#D43737]" : "border-white/25",
          )}
        />
        {errors.phone && (
          <span className="text-[#ff4444] text-[11px] font-sans">
            {errors.phone}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1 mb-8">
        <label className="font-sans text-[13px] text-white/55">
          {t.messageLabel}
        </label>
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent outline-none w-full text-white font-sans text-[14px] h-7.5 border-b border-white/25 resize-none"
        />
      </div>

      {/* Privacy */}
      <div className="flex flex-col gap-1 mb-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPrivacy(!privacy);
              setErrors((prev) => ({ ...prev, privacy: "" }));
            }}
            className="shrink-0 w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center cursor-pointer"
          >
            {privacy && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            )}
          </button>
          <span className="font-sans text-[13px] text-white/55">
            {t.privacyText}{" "}
            <Link href="/privacy-policy" className="text-[#D4AF37] underline">
              {t.privacyLink}
            </Link>
          </span>
        </div>
        {errors.privacy && (
          <span className="text-[#ff4444] text-[11px] font-sans ml-7">
            {errors.privacy}
          </span>
        )}
      </div>

      {/* Channel select */}
      <div className="mb-8">
        <p className="mb-4 font-sans text-[13px] text-white/55">
          {t.channelLabel}
        </p>
        <div className="flex flex-wrap justify-start gap-2.5">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setChannel(ch.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-2.5 w-[calc(33.33%-7px)] md:w-auto md:flex-1 min-w-0 py-3.75 px-2 rounded-[15px] bg-[#111] border transition-colors duration-200 cursor-pointer",
                channel === ch.id
                  ? "border-[#D4AF37] text-white"
                  : "border-transparent text-[#5E5E5E] hover:border-[#D4AF37] hover:text-white",
              )}
            >
              <span className="shrink-0 flex items-center justify-center">
                {ch.icon}
              </span>
              <span className="text-[12px] font-normal font-sans leading-normal text-center w-full">
                {chLabels[ch.id]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit row */}
      <div className="relative min-w-4/5 md:min-w-0 md:w-fit">
        <CTAButton
          type="submit"
          className={cn("max-md:w-full max-md:justify-between", isFormFilled ? "" : "cta-btn-white")}
        >
          {t.submit}
        </CTAButton>
        {submitted && (
          <div className="mt-4 md:mt-0 md:absolute md:left-[calc(100%+24px)] md:top-1/2 md:-translate-y-1/2 flex items-center gap-2 md:w-max px-5 py-5 rounded-[30px] border border-[rgba(212,175,55,0.10)] bg-[rgba(255,255,255,0.10)] backdrop-blur-[5px] text-white font-sans text-[13px] font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden
              className="shrink-0"
            >
              <path
                d="M7.70045 15.75C7.83211 15.978 8.02146 16.1674 8.24949 16.299C8.47751 16.4306 8.73616 16.4999 8.99945 16.4999C9.26274 16.4999 9.5214 16.4306 9.74942 16.299C9.97744 16.1674 10.1668 15.978 10.2985 15.75M2.44595 11.4945C2.34798 11.6019 2.28332 11.7354 2.25984 11.8789C2.23637 12.0223 2.25509 12.1695 2.31373 12.3025C2.37237 12.4356 2.4684 12.5487 2.59014 12.6281C2.71188 12.7075 2.85409 12.7499 2.99945 12.75H14.9995C15.1448 12.7501 15.287 12.7079 15.4089 12.6286C15.5307 12.5493 15.6268 12.4363 15.6856 12.3034C15.7444 12.1705 15.7633 12.0233 15.74 11.8798C15.7167 11.7364 15.6523 11.6028 15.5545 11.4952C14.557 10.467 13.4995 9.37425 13.4995 6C13.4995 4.80653 13.0253 3.66193 12.1814 2.81802C11.3375 1.97411 10.1929 1.5 8.99945 1.5C7.80598 1.5 6.66139 1.97411 5.81747 2.81802C4.97356 3.66193 4.49945 4.80653 4.49945 6C4.49945 9.37425 3.4412 10.467 2.44595 11.4945Z"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            {t.success}
          </div>
        )}
      </div>
    </form>
  );
}
