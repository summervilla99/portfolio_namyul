// src/shared/PhotosPanelFixed.tsx
import { useEffect, useState } from "react";
import gallery from "../content/gallery.json";

type Item = { src: string; alt?: string; ratio?: string };

export default function PhotosPanelFixed() {
  const data = gallery as Item[];
  const [active, setActive] = useState<number | null>(null);

  const withBase = (p: string) =>
    `${import.meta.env.BASE_URL.replace(/\/$/, "")}${p}`;

  const open = (i: number) => setActive(i);
  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? null : (i + data.length - 1) % data.length));
  const next = () => setActive((i) => (i === null ? null : (i + 1) % data.length));

  // ESC/←/→ 키보드
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    // 배경 스크롤 잠금
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <>
      {/* 3컬럼: 왼쪽 2×2 + 오른쪽 Tall */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1,2 */}
        <Thumb item={data[0]} onClick={() => open(0)} />
        <Thumb item={data[1]} onClick={() => open(1)} />
        {/* 3 (Tall 두 행) */}
        <Thumb item={data[2]} onClick={() => open(2)} className="md:row-span-2 aspect-[2/5]" forceAspect />
        {/* 4,5 */}
        <Thumb item={data[3]} onClick={() => open(3)} />
        <Thumb item={data[4]} onClick={() => open(4)} />
      </div>

      {/* 라이트박스 모달 */}
      {active !== null && (
        <div
            className="fixed inset-0 z-50 bg-black/80"
            onClick={close}
            role="dialog"
            aria-modal="true"
        >
            {/* 전체 레이어를 relative로 두고 중앙 정렬 */}
            <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            {/* 좌/우 그라데이션(시각적 여백) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/60 to-transparent"></div>

            {/* 큰 이미지 */}
            <img
                src={withBase(data[active].src)}
                alt={data[active].alt}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            />

            {/* 닫기 버튼 */}
            <button
                className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white text-2xl leading-none shadow-lg flex items-center justify-center"
                onClick={close}
                aria-label="Close"
            >
                ×
            </button>

            {/* 이전 버튼 */}
            <button
                className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center"
                onClick={prev}
                aria-label="Previous"
            >
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white">
                <path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            {/* 다음 버튼 */}
            <button
                className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center"
                onClick={next}
                aria-label="Next"
            >
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            </div>
        </div>
        )}
    </>
  );
}

function Thumb({
  item,
  onClick,
  className = "",
  forceAspect = false,
}: {
  item: Item;
  onClick: () => void;
  className?: string;
  forceAspect?: boolean; // true면 전달된 className의 aspect를 사용
}) {
  const withBase = (p: string) =>
    `${import.meta.env.BASE_URL.replace(/\/$/, "")}${p}`;
  const ratio = item.ratio || "4/5";
  const aspectClass = forceAspect ? "" : `aspect-[${ratio}]`;
  return (
    <figure
      className={`${aspectClass} ${className} overflow-hidden rounded-xl border theme-border cursor-pointer`}
      onClick={onClick}
    >
      <img
        src={withBase(item.src)}
        alt={item.alt}
        className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        loading="lazy"
      />
    </figure>
  );
}
