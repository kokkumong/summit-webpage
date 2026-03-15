/**
 * 멘토링 일정 선택용 캘린더 UI
 * - 한 달 단위 그리드, 날짜 클릭 시 선택/해제
 */

import { useState } from "react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getMonthInfo(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startBlank = first.getDay();
  const daysInMonth = last.getDate();
  return { startBlank, daysInMonth };
}

export interface MentoringCalendarProps {
  /** 선택된 날짜들 (YYYY-MM-DD) */
  selectedDates: string[];
  /** 날짜 선택/해제 시 */
  onSelectDates: (dates: string[]) => void;
}

export function MentoringCalendar({
  selectedDates,
  onSelectDates,
}: MentoringCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const { startBlank, daysInMonth } = getMonthInfo(year, month);

  const toggleDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const next = selectedDates.includes(dateStr)
      ? selectedDates.filter((d) => d !== dateStr)
      : [...selectedDates, dateStr].sort();
    onSelectDates(next);
  };

  const goPrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const goNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < startBlank; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-lg px-3 py-1 text-slate-400 hover:bg-slate-700 hover:text-white"
          aria-label="이전 달"
        >
          ←
        </button>
        <span className="text-lg font-semibold text-white">
          {year}년 {month + 1}월
        </span>
        <button
          type="button"
          onClick={goNext}
          className="rounded-lg px-3 py-1 text-slate-400 hover:bg-slate-700 hover:text-white"
          aria-label="다음 달"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="py-1 font-medium text-slate-400"
          >
            {w}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isSelected = selectedDates.includes(dateStr);
          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => toggleDate(day)}
              className={
                isSelected
                  ? "rounded-lg bg-cyan-500 py-2 text-slate-950 font-medium shadow-md shadow-cyan-500/25"
                  : "rounded-lg py-2 text-slate-300 hover:bg-slate-700 hover:text-white"
              }
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
