import items from "../content/gallery.json";

type Item = {
  src: string;      // "/assets/gallery/…"
  alt?: string;
  ratio?: string;   // "4/5" | "3/4" | "1/1" | …
  span?: number;    // 2로 주면 그 이미지가 2칸(열) 차지
};

type Props = {
  cols?: { base?: number; md?: number; lg?: number };
  gap?: { x?: number; y?: number }; // Tailwind gap 단위 숫자 (4 => gap-4)
};

export default function PhotosPanel({
  cols = { base: 2, md: 3, lg: 3 },
  gap = { x: 4, y: 4 },
}: Props) {
  const data = items as Item[];

  const withBase = (path: string) =>
    `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;

  // cols/gap 조합
  const gridCls =
    `grid grid-cols-${cols.base} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg} ` +
    `gap-x-${gap.x} gap-y-${gap.y}`;

  return (
    <div className={gridCls}>
      {data.map((it, i) => {
        const ratio = it.ratio || "4/5";
        const spanCls = it.span === 2 ? "col-span-2" : "";
        return (
          <figure
            key={i}
            className={`${spanCls} aspect-[${ratio}] overflow-hidden rounded-xl border theme-border`}
          >
            <img
              src={withBase(it.src)}
              alt={it.alt || `photo-${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
        );
      })}
    </div>
  );
}