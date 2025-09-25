import ThemeToggle from './shared/ThemeToggle'
import VideoCard from './shared/VideoCard'
import { useSectionScroll } from './shared/useSectionScroll'

export default function App() {
  const { register, scrollTo } = useSectionScroll();

  // 포트폴리오 영상 리스트(원하는 ID로 교체)
  const portfolioVideos = [
    { id: "dQw4w9WgXcQ", title: "Showreel 2025" },
    // { id: "YOUTUBE_ID_2", title: "Scene - ..." },
    // { id: "YOUTUBE_ID_3", title: "Monologue - ..." },
  ];

  return (
    <div className="theme-bg theme-fg min-h-screen">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <button className="text-base font-semibold" onClick={()=>scrollTo('home')}>
            Nam Yul
          </button>
          <nav className="flex items-center gap-2">
            <button className="navlink" onClick={()=>scrollTo('home')}>Home</button>
            <button className="navlink" onClick={()=>scrollTo('portfolio')}>Portfolio</button>
            <button className="navlink" onClick={()=>scrollTo('about')}>About</button>
            <div className="ml-2"><ThemeToggle /></div>
          </nav>
        </div>
        <div className="h-px w-full theme-border border-t" />
      </header>

      {/* 메인: 하나의 페이지 안에 3개 섹션 */}
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-24">

        {/* 1) HOME 섹션 */}
        <section ref={register('home')} className="space-y-8" aria-label="Home">
          {/* 히어로 / 프로필 컴카드 */}
          <div className="grid gap-6 md:grid-cols-[280px,1fr] items-start">
            {/* 프로필 사진(원하면 이미지로 교체) */}
            <div className="card h-full flex items-center justify-center">
              {/* <img src="/assets/headshots/main.jpg" alt="Nam Yul" className="rounded-2xl object-cover w-full h-full" /> */}
              <div className="text-center">
                <div className="text-3xl font-bold">Nam Yul</div>
                <div className="text-sm mt-1 text-[color:var(--muted)]">Actor</div>
              </div>
            </div>

            {/* 컴카드 정보 */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-3">Comp Card</h2>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-[color:var(--muted)]">Height</span><div className="font-medium">178 cm</div></div>
                <div><span className="text-[color:var(--muted)]">Weight</span><div className="font-medium">70 kg</div></div>
                <div><span className="text-[color:var(--muted)]">Eyes</span><div className="font-medium">Dark Brown</div></div>
                <div><span className="text-[color:var(--muted)]">Hair</span><div className="font-medium">Black</div></div>
                <div className="sm:col-span-2">
                  <span className="text-[color:var(--muted)]">Contact</span>
                  <div className="font-medium">agency@example.com · +82-10-0000-0000</div>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <a href="/pdfjs/web/viewer.html?file=/assets/docs/portfolio-kr.pdf" className="btn">
                  Download Portfolio (KR)
                </a>
                {/* EN 버전 있으면 추가 */}
                {/* <a href="/pdfjs/web/viewer.html?file=/assets/docs/portfolio-en.pdf" className="btn">EN</a> */}
              </div>
            </div>
          </div>

          {/* 간단 소개 */}
          <div className="card">
            <p className="text-[color:var(--muted)]">
              Film & Theatre actor based in Seoul. Focused on grounded, emotionally precise performances.
            </p>
          </div>
        </section>

        {/* 2) PORTFOLIO 섹션 (영상 모음) */}
        <section ref={register('portfolio')} className="space-y-6" aria-label="Portfolio">
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

        {/* 3) ABOUT 섹션 */}
        <section ref={register('about')} className="space-y-6" aria-label="About">
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
