import { useEffect, useState } from "react"
export function useHeaderShrink(th = 12) {
  const [shrink, setShrink] = useState(false)
  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > th)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [th])
  return shrink
}
