type Props = { id: string; title: string }
export default function VideoCard({ id, title }: Props) {
  return (
    <div className="aspect-video rounded-2xl overflow-hidden shadow card">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
