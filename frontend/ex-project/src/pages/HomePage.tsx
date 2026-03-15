/**
 * 홈 페이지
 * SUMMIT 밴드를 소개하는 그라데이션 배경의 랜딩 화면
 */

export function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* 그라데이션 배경 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-amber-950/80 via-neutral-950 to-rose-950/60"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(245,158,11,0.25),transparent)]"
        aria-hidden
      />

      {/* 콘텐츠 */}
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-amber-400/90">
          Band
        </p>
        <h2 className="text-5xl font-bold tracking-tight text-white drop-shadow-lg md:text-7xl">
          SUMMIT
        </h2>
        <p className="mt-4 max-w-md text-lg text-neutral-300">
          음악과 함께하는 SUMMIT 밴드의 공식 웹페이지입니다.
        </p>
      </div>
    </main>
  );
}
