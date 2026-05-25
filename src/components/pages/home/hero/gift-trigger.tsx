"use client";

import { useState, useEffect } from "react";
import { GiftButton } from "./gift-button";
import { GiftModal } from "./gift-modal";
import { QuizModal } from "./quiz-modal";

export function GiftTrigger() {
  const [showGift, setShowGift] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

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

  return (
    <>
      <GiftButton onClick={() => setShowGift(true)} />
      {showGift && <GiftModal onClose={() => setShowGift(false)} onQuiz={openQuiz} />}
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} />}
    </>
  );
}
