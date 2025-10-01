// src/shared/useSectionScroll.ts
import { useCallback, useRef } from 'react'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function smoothScrollTo(targetY: number, duration = 1200) {
  const startY = window.scrollY
  const delta = targetY - startY
  const start = performance.now()

  function step(now: number) {
    const t = Math.min(1, (now - start) / duration)
    const eased = easeOutCubic(t)
    window.scrollTo(0, startY + delta * eased)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function useSectionScroll() {
  const mapRef = useRef<Record<string, HTMLElement | null>>({})

  const register = useCallback((id: string) => (el: HTMLElement | null) => {
    mapRef.current[id] = el
  }, [])

  const scrollToTop = useCallback(() => {
    smoothScrollTo(0, 1200) // 매우 느리게 스크롤
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = mapRef.current[id]
    if (!el) return
    // 고정 헤더 보정(섹션에 section-offset 있어도 약간 더 안정적으로)
    const HEADER = 96
    const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER)
    smoothScrollTo(targetY, 1100)

    // 도착 섹션 살짝 하이라이트(모던한 포커스 느낌)
    el.classList.add('section-pulse')
    setTimeout(() => el.classList.remove('section-pulse'), 1000)
  }, [])

  return { register, scrollTo, scrollToTop }
}
