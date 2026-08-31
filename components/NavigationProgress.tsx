"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

export default function NavigationProgress() {
  const pathname = usePathname();
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current !== pathname) {
      NProgress.done();
      prev.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    function onStart() { NProgress.start(); }
    function onDone() { NProgress.done(); }

    // Intercept link clicks for instant feedback
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || anchor.getAttribute("target") === "_blank") return;
      // Only trigger for internal navigation
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin === window.location.origin) {
          onStart();
        }
      } catch { /* ignore */ }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
