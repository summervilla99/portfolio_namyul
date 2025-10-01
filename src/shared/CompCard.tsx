import { motion } from 'framer-motion'
import dataJson from "../content/compcard.json";
type CompData = typeof dataJson;

export default function CompCard() {
  const data: CompData = dataJson;
  const p = data.personal;

  const imgSrc1 = `${import.meta.env.BASE_URL}assets/headshots/main2.png`;
  const imgSrc2 = `${import.meta.env.BASE_URL}assets/headshots/main1.png`;

  const ver1 = "남율_프로필_남_99년생_1.pdf";
  const ver2 = "남율_프로필_남_99년생_2.pdf";

  const fileUrl = (name: string) =>
    `${import.meta.env.BASE_URL}assets/docs/${encodeURIComponent(name)}`;

  return (
    <section className="card p-0 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* 좌측: 사진 2장 */}
        <div className="flex-shrink-0 w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r theme-border flex flex-col space-y-4 p-4 md:p-5">
          <figure className="aspect-[4/5] w-full overflow-hidden rounded-lg">
            <img
              src={imgSrc1}
              alt={`${data.name_en} headshot 1`}
              className="object-cover w-full h-full img-blur"
              loading="eager"
              onLoad={(e) => e.currentTarget.setAttribute('data-loaded','true')}
            />
          </figure>
          <figure className="aspect-[4/5] w-full overflow-hidden rounded-lg">
            <img
              src={imgSrc2}
              alt={`${data.name_en} headshot 2`}
              className="object-cover w-full h-full img-blur"
              loading="lazy"
              onLoad={(e) => e.currentTarget.setAttribute('data-loaded','true')}
            />
          </figure>
        </div>

        {/* 우측: 정보 + 경력 */}
        <div className="flex-1 p-5 md:p-6 space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold">
                {data.name_kr} <span className="text-[color:var(--muted)]">/ {data.name_en}</span>
              </h2>
              <div className="mt-1 text-sm">
                {data.contact.phone} · {data.contact.email}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <motion.a href={fileUrl(ver1)} className="btn" download whileHover={{ y:-2 }} whileTap={{ scale:.98 }}>
                Download Portfolio (Ver1)
              </motion.a>
              <motion.a href={fileUrl(ver2)} className="btn" download whileHover={{ y:-2 }} whileTap={{ scale:.98 }}>
                Download Portfolio (Ver2)
              </motion.a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <Info label="나이/생년" value={`${p.age} (${p.birth})`} />
            <Info label="신체" value={`${p.height_cm}cm · ${p.weight_kg}kg`} />
            <Info label="학력" value={p.education} />
            <Info label="특기" value={p.skills.join(", ")} />
            <Info label="취미" value={p.hobbies.join(", ")} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Section title="DRAMA" items={data.drama.map(d => `${d.year} ${d.title}${d.role ? `, ${d.role}역` : ""}${d.credit ? ` | ${d.credit}` : ""}`)} />
            <Section title="THEATER" items={data.theater.map(t => `${t.year} ${t.title}${t.role ? `, ${t.role}역` : ""}${t.credit ? ` | ${t.credit}` : ""}`)} />
            <Section title="FILM" items={data.film.map(f => `${f.year} ${f.type ?? ""} ‘${f.title}’${f.role ? `, ${f.role} 역` : ""}${f.credit ? ` | ${f.credit}` : ""}`)} />
            <Section title="COMMERCIALS" items={data.commercials.map(c => `${c.year} ${c.title}${c.role ? `, ${c.role}역` : ""}${c.credit ? ` | ${c.credit}` : ""}`)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[color:var(--muted)]">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <ul className="space-y-1 text-sm leading-6">
        {items.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}
