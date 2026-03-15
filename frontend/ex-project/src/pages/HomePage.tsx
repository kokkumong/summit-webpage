/**
 * 홈 페이지
 * SUMMIT 밴드를 소개하는 그라데이션 배경의 랜딩 화면
 */

export function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* 우주/몽환 그라데이션 배경 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-950/90 to-violet-950/60"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(34,211,238,0.15),transparent_50%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(139,92,246,0.12),transparent_50%)]"
        aria-hidden
      />

      {/* 콘텐츠 */}
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-400/90">
          Band
        </p>
        <h2 className="text-5xl font-bold tracking-tight text-white drop-shadow-lg md:text-7xl">
          SUMMIT
        </h2>
        <p className="mt-4 max-w-md text-lg text-slate-300">
          IT대 x AI대 연합 밴드 SUMMIT 공식 웹페이지입니다.
        </p>
      </div>
    </main>
  );
}
