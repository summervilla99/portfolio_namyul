import { useRef } from 'react'
import ThemeToggle from './shared/ThemeToggle'
import VideoCard from './shared/VideoCard'
import CompCard from './shared/CompCard'
import PhotosPanelFixed from './shared/PhotosPanelFixed'

import ScrollProgressBar from './shared/ScrollProgressBar'
import { useSectionScroll } from './shared/useSectionScroll'
import { useHeaderShrink } from './shared/useHeaderShrink'
import { useReveal } from './shared/useReveal'
import { useScrollSpy } from './shared/useScrollSpy'

export default function App() {
  const { register, scrollTo, scrollToTop } = useSectionScroll()
  const shrink = useHeaderShrink(8)

  // 섹션 리빌용 ref
  const photoRef = useRef<HTMLElement | null>(null)
  const portRef  = useRef<HTMLElement | null>(null)
  const aboutRef = useRef<HTMLElement | null>(null)
  useReveal(photoRef)
  useReveal(portRef, 0.05)
  useReveal(aboutRef, 0.1)

  // 상단 내비 활성 표시
  const active = useScrollSpy(['home','photo','portfolio','about'], 140)

  // 섹션 ref 콜백 (타입 안전)
  const setPhotoRef = (el: HTMLElement | null) => { register('photo')(el);  photoRef.current = el }
  const setPortRef  = (el: HTMLElement | null) => { register('portfolio')(el); portRef.current  = el }
  const setAboutRef = (el: HTMLElement | null) => { register('about')(el); aboutRef.current = el }

  // 포트폴리오 영상
  const portfolioVideos = [{ id: "GVkeusQ20iY", title: "" }]

  return (
    <div className="theme-bg theme-fg min-h-screen">
      <ScrollProgressBar />

      {/* 헤더 */}
      <header
        className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-transparent transition-all ${shrink ? "py-2" : "py-4"}`}
      >
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between">
          <button className="text-base font-semibold" onClick={() => scrollToTop()}>
            Nam Yul
          </button>
          <nav className="flex items-center gap-2">
            <button className="navlink" aria-selected={active === 'home'} onClick={() => scrollToTop()}>Home</button>
            <button className="navlink" aria-selected={active === 'photo'} onClick={() => scrollTo('photo')}>Photo</button>
            <button className="navlink" aria-selected={active === 'portfolio'} onClick={() => scrollTo('portfolio')}>Portfolio</button>
            <button className="navlink" aria-selected={active === 'about'} onClick={() => scrollTo('about')}>About</button>
            <div className="ml-2"><ThemeToggle /></div>
          </nav>
        </div>
        <div className="h-px w-full theme-border border-t" />
      </header>

      {/* 메인 */}
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-24">
        {/* HOME */}
        <section ref={register('home')} className="space-y-8 section-offset" aria-label="Home">
          <CompCard />
          <div className="card content">
            <p className="theme-muted">
              Film & Theatre actor based in Seoul. Focused on grounded, emotionally precise performances.
            </p>
          </div>
        </section>

        {/* PHOTO */}
        <section ref={setPhotoRef} className="space-y-6 section-offset" aria-label="Photo">
          <h2 className="text-2xl font-bold">Photo</h2>
          <div className="card p-5">
            <PhotosPanelFixed />
          </div>
        </section>

        {/* PORTFOLIO */}
        <section ref={setPortRef} className="space-y-6 section-offset" aria-label="Portfolio">
          <h2 className="text-2xl font-bold">Portfolio</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {portfolioVideos.map(v => (
              <div key={v.id}>
                <div className="mb-2 text-sm font-medium">{v.title}</div>
                <VideoCard id={v.id} title={v.title} />
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section ref={setAboutRef} className="space-y-6 section-offset" aria-label="About">
          <h2 className="text-2xl font-bold">About</h2>
          <div className="card content">
            <p className="leading-7">
              Nam Yul (남율). Recent works include independent films and stage plays.
              Trained in text analysis, movement, and on-camera performance.
            </p>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm theme-muted">
        © {new Date().getFullYear()} Nam Yul — Actor Portfolio
      </footer>
    </div>
  )
}
