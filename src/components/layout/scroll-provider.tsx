"use client";

import { useEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const instance = OverlayScrollbars(document.body, {
      scrollbars: {
        theme: "os-theme-dark",
        autoHide: "never",
        clickScroll: true,
      },
    });
    return () => instance.destroy();
  }, []);

  return <>{children}</>;
}