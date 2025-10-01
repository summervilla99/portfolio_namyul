import { useScrollProgress } from "./useScrollProgress"

export default function ScrollProgressBar() {
  const p = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 z-[60] h-1"
      style={{
        width: `${Math.min(100, Math.max(0, p * 100))}%`,
        background: "var(--accent)",
        transition: "width .15s linear"
      }}
    />
  )
}
