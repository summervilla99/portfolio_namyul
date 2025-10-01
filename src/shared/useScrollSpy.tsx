import { useEffect, useState } from "react"

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map(id => document.querySelector<HTMLElement>(`[aria-label="${id.charAt(0).toUpperCase()+id.slice(1)}"]`))
      .filter(Boolean) as HTMLElement[]

    const onScroll = () => {
      const y = window.scrollY + offset
      let current = ids[0]
      for (const el of sections) {
        if (el.offsetTop <= y) current = (el.getAttribute('aria-label') || '').toLowerCase()
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}
