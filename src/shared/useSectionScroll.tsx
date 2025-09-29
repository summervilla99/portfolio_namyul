// src/shared/useSectionScroll.ts
import { useCallback, useEffect, useRef } from "react";

export function useSectionScroll() {
  const sections = useRef<Record<string, HTMLElement | null>>({});

  const register = useCallback((id: string) => (el: HTMLElement | null) => {
    sections.current[id] = el;
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = sections.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const base = location.href.split("#/")[0];
      history.replaceState(null, "", `${base}#/section=${id}`);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const base = location.href.split("#/")[0];
    history.replaceState(null, "", `${base}#/`);
  }, []);

  useEffect(() => {
    const m = location.hash.match(/section=([A-Za-z0-9_-]+)/);
    if (m?.[1]) {
      // URL에 명시된 섹션으로
      setTimeout(() => scrollTo(m[1]), 0);
    } else {
      // 기본은 최상단
      setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
    }
  }, [scrollTo]);

  return { register, scrollTo, scrollToTop };
}
