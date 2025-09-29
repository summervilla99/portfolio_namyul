// src/App.tsx
import ThemeToggle from './shared/ThemeToggle'
import VideoCard from './shared/VideoCard'
import CompCard from './shared/CompCard'
import PhotosPanelFixed from './shared/PhotosPanelFixed'
import { useSectionScroll } from './shared/useSectionScroll'

export default function App() {
  const { register, scrollTo, scrollToTop } = useSectionScroll();

  const portfolioVideos = [
    { id: "GVkeusQ20iY", title: "남율 출연영상" },
  ];

  return (
    <div className="theme-bg theme-fg min-h-screen">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <button className="text-base font-semibold" onClick={() => scrollToTop()}>
            Nam Yul
          </button>
          <nav className="flex items-center gap-2">
            <button className="navlink" onClick={() => scrollToTop()}>Home</button>
            <button className="navlink" onClick={() => scrollTo('photo')}>Photo</button>
            <button className="navlink" onClick={() => scrollTo('portfolio')}>Portfolio</button>
            <button className="navlink" onClick={() => scrollTo('about')}>About</button>
            <div className="ml-2"><ThemeToggle /></div>
          </nav>
        </div>
        <div className="h-px w-full theme-border border-t" />
      </header>

      {/* 메인 */}
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-24">

        {/* HOME */}
        <section ref={register('home')} className="space-y-8 scroll-mt-24" aria-label="Home">
          <CompCard />
          <div className="card">
            <p className="text-[color:var(--muted)]">
              Film & Theatre actor based in Seoul. Focused on grounded, emotionally precise performances.
            </p>
          </div>
        </section>

        {/* PHOTO (새 탭 섹션) */}
        <section ref={register('photo')} className="space-y-6 scroll-mt-24" aria-label="Photo">
          <div className="card">
            <div className="border-b theme-border mb-4">
              <nav className="flex gap-1">
                <button type="button" className="navlink outline outline-1 -outline-offset-1" aria-selected="true">
                  Photo
                </button>
              </nav>
            </div>
            <PhotosPanelFixed />
          </div>
        </section>

        {/* PORTFOLIO (영상) */}
        <section ref={register('portfolio')} className="space-y-6 scroll-mt-24" aria-label="Portfolio">
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
        <section ref={register('about')} className="space-y-6 scroll-mt-24" aria-label="About">
          <h2 className="text-2xl font-bold">About</h2>
          <div className="card">
            <p className="leading-7">
              Nam Yul (남율). Recent works include independent films and stage plays.
              Trained in text analysis, movement, and on-camera performance.
            </p>
          </div>
        </section>

      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-[color:var(--muted)]">
        © {new Date().getFullYear()} Nam Yul — Actor Portfolio
      </footer>
    </div>
  )
}
