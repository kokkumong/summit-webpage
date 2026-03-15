import type { Show, ScheduleSectionProps } from '../types/schedule'

/**
 * 날짜 문자열을 "YYYY.MM.DD" 또는 "MM월 DD일" 같은 읽기 쉬운 형식으로 포맷
 */
function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

/** 단일 공연 카드 */
function ShowCard({ show }: { show: Show }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-neutral-700/60 bg-neutral-900/80 p-6 shadow-xl backdrop-blur transition hover:border-amber-500/40 hover:shadow-amber-500/10"
      data-show-id={show.id}
    >
      {/* 날짜 뱃지 */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400">
        <span aria-hidden="true">📅</span>
        {formatDisplayDate(show.date)}
      </div>

      <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">
        {show.title}
      </h3>
      {show.description && (
        <p className="mb-4 text-sm text-neutral-400">{show.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-300">
        <span className="flex items-center gap-1.5">
          <span className="text-amber-500">⏱</span>
          {show.time}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-amber-500">📍</span>
          <span>{show.venue.name}</span>
          {show.venue.city && (
            <span className="text-neutral-500">· {show.venue.city}</span>
          )}
        </span>
      </div>

      {show.ticketUrl && (
        <a
          href={show.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
        >
          예매하기
          <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  )
}

/**
 * SUMMIT 밴드 공연 일정 메인 섹션
 * Tailwind CSS로 세련된 카드 그리드 레이아웃
 */
export function ScheduleSection({
  shows,
  title = '공연 일정',
  maxItems = 0,
}: ScheduleSectionProps) {
  const list = maxItems > 0 ? shows.slice(0, maxItems) : shows

  if (list.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="text-center text-neutral-400">
          예정된 공연이 없습니다. 곧 새로운 일정을 공유할 예정입니다.
        </p>
      </section>
    )
  }

  return (
    <section
      className="mx-auto max-w-6xl px-4 py-16 md:px-6"
      aria-labelledby="schedule-heading"
    >
      <h2
        id="schedule-heading"
        className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-amber-500"
      >
        Live
      </h2>
      <h3 className="mb-12 text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </section>
  )
}
