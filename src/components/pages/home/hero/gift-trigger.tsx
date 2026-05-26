"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GiftButton } from "./gift-button";
import { GiftModal } from "./gift-modal";
import { QuizModal } from "./quiz-modal";

export function GiftTrigger() {
  const [showGift, setShowGift] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const anyOpen = showGift || showQuiz;

  useEffect(() => {
    if (anyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [anyOpen]);

  useEffect(() => {
    if (!showGift) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowGift(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showGift]);

  function openQuiz() {
    setShowGift(false);
    setShowQuiz(true);
  }

  function handleGiftClick() {
    sessionStorage.setItem("quiz_opened", "1");
    setShowGift(true);
  }

  return (
    <>
      <Image src="/gif.svg" alt="" width={200} height={200} priority unoptimized className="hidden" aria-hidden="true" />
      <GiftButton onClick={handleGiftClick} />
      {showGift && <GiftModal onClose={() => setShowGift(false)} onQuiz={openQuiz} />}
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} />}
    </>
  );
}
