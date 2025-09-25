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
      // URL에 해시 표시( HashRouter와 충돌 없도록 "#/section=portfolio" 형식 )
      const base = location.href.split("#/")[0];
      history.replaceState(null, "", `${base}#/section=${id}`);
    }
  }, []);

  // 첫 로드 시, URL에 section이 있으면 그쪽으로 스크롤
  useEffect(() => {
    const m = location.hash.match(/section=([A-Za-z0-9_-]+)/);
    if (m?.[1]) scrollTo(m[1]);
  }, [scrollTo]);

  return { register, scrollTo };
}
