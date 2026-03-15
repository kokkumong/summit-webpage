/**
 * SUMMIT Web Page 공통 헤더
 * 기능별 네비게이션 링크를 포함합니다.
 */

export type PageId =
  | "home"
  | "instrument-rental"
  | "practice-room"
  | "mentoring";

export interface HeaderProps {
  /** 현재 활성 페이지 */
  currentPage: PageId;
  /** 페이지 변경 시 호출 */
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "home", label: "홈" },
  { id: "instrument-rental", label: "악기 대여 사업" },
  { id: "practice-room", label: "소모임실 예약" },
  { id: "mentoring", label: "멘토링" },
];

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/80 bg-slate-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">
          SUMMIT Web Page
        </h1>
        <nav className="flex items-center gap-1 md:gap-2" aria-label="메인 메뉴">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={
                currentPage === id
                  ? "rounded-lg bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950 transition shadow-lg shadow-cyan-500/25"
                  : "rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
              }
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
