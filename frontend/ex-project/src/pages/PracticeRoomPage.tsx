/**
 * 소모임실 예약 페이지
 * - 시간대를 바 형식으로 표시
 * - 30분 단위 선택, 날짜/시간 입력 후 예약하기 → 본인 예약 반영, 대표자 이름 표시
 */

import { useState } from "react";
import type { PracticeRoomBooking } from "../types/practiceRoom";

/** 하루 30분 단위 슬롯 (예: 09:00 ~ 22:00) */
const SLOT_LABELS: string[] = [];
for (let h = 9; h <= 22; h++) {
  SLOT_LABELS.push(`${String(h).padStart(2, "0")}:00`);
  if (h < 22) SLOT_LABELS.push(`${String(h).padStart(2, "0")}:30`);
}

/** 슬롯 인덱스 → "HH:mm" */
function slotToTime(index: number): string {
  return SLOT_LABELS[index] ?? "09:00";
}

/** "HH:mm" → 슬롯 인덱스 */
function timeToSlot(time: string): number {
  const i = SLOT_LABELS.indexOf(time);
  return i >= 0 ? i : 0;
}

export function PracticeRoomPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [startSlot, setStartSlot] = useState(0);
  const [endSlot, setEndSlot] = useState(1); // 30분 = 1칸
  const [representativeName, setRepresentativeName] = useState("");

  /** 내가 예약한 목록 (예약하기 버튼으로 추가) */
  const [myBookings, setMyBookings] = useState<PracticeRoomBooking[]>([]);

  /** 다른 사람 예약 (바에 표시용 샘플) */
  const [allBookings, setAllBookings] = useState<PracticeRoomBooking[]>([
    {
      id: "b1",
      date: "2026-03-16",
      startTime: "10:00",
      endTime: "11:00",
      representativeName: "김대표",
    },
    {
      id: "b2",
      date: "2026-03-16",
      startTime: "14:00",
      endTime: "15:30",
      representativeName: "이팀장",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !representativeName.trim()) return;

    const startTime = slotToTime(startSlot);
    const endTime = slotToTime(endSlot);
    if (startSlot >= endSlot) return;

    const newBooking: PracticeRoomBooking = {
      id: `b${Date.now()}`,
      date: selectedDate,
      startTime,
      endTime,
      representativeName: representativeName.trim(),
    };

    setMyBookings((prev) => [...prev, newBooking]);
    setAllBookings((prev) => [...prev, newBooking]);
    setRepresentativeName("");
    setStartSlot(0);
    setEndSlot(1);
  };

  /** 해당 날짜의 예약들을 바에 표시하기 위해 슬롯 범위 계산 */
  const displayDate = selectedDate || "2026-03-16";
  const bookingsForDay = allBookings.filter((b) => b.date === displayDate);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
        소모임실 예약
      </h2>

      {/* 날짜 선택 */}
      <section className="mb-8">
        <label className="mb-2 block text-sm font-medium text-slate-300">
          날짜 선택
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
        />
      </section>

      {/* 시간대 바 형식 UI */}
      <section className="mb-10">
        <h3 className="mb-4 text-lg font-semibold text-cyan-400">
          시간대 현황 ({displayDate})
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
          {/* 시간 축 레이블 */}
          <div className="mb-2 flex justify-between text-xs text-slate-500">
            <span>09:00</span>
            <span>22:00</span>
          </div>
          {/* 바 트랙 */}
          <div className="relative flex h-12 w-full rounded-lg bg-slate-800">
            {SLOT_LABELS.map((_, i) => (
              <div
                key={i}
                className="h-full flex-1 border-r border-slate-700 last:border-r-0"
                title={slotToTime(i)}
              />
            ))}
            {/* 예약된 구간 오버레이 */}
            {bookingsForDay.map((b) => {
              const s = timeToSlot(b.startTime);
              const e = timeToSlot(b.endTime);
              const width = ((e - s) / SLOT_LABELS.length) * 100;
              const left = (s / SLOT_LABELS.length) * 100;
              return (
                <div
                  key={b.id}
                  className="absolute top-1 h-10 rounded bg-cyan-500/80 py-1 px-2 text-xs font-medium text-slate-950"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    minWidth: "60px",
                  }}
                  title={`${b.startTime}~${b.endTime} ${b.representativeName}`}
                >
                  {b.representativeName}
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-slate-500">
            위 바는 해당 날짜의 예약된 시간대를 표시합니다. 청록색: 예약 구간, 대표자 이름 표시.
          </p>
        </div>
      </section>

      {/* 예약 폼: 시간(30분 단위) + 대표자 이름 → 예약하기 */}
      <section className="mb-10">
        <h3 className="mb-4 text-lg font-semibold text-cyan-400">
          소모임실 예약하기
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-900/80 p-4"
        >
          <div>
            <label className="mb-1 block text-sm text-slate-400">
              날짜
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-slate-400">
                시작 시간 (30분 단위)
              </label>
              <select
                value={startSlot}
                onChange={(e) => setStartSlot(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
              >
                {SLOT_LABELS.map((t, i) => (
                  <option key={t} value={i}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-400">
                종료 시간 (30분 단위)
              </label>
              <select
                value={endSlot}
                onChange={(e) => setEndSlot(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
              >
                {SLOT_LABELS.map((t, i) => (
                  <option key={t} value={i}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-400">
              대표자 이름
            </label>
            <input
              type="text"
              value={representativeName}
              onChange={(e) => setRepresentativeName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-500"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-cyan-500 px-4 py-3 text-sm font-medium text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
          >
            예약하기
          </button>
        </form>
      </section>

      {/* 본인 예약 반영 목록 (대표자 이름 표시) */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-cyan-400">
          내 예약 목록
        </h3>
        {myBookings.length === 0 ? (
          <p className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-400">
            아직 예약한 내역이 없습니다. 위에서 예약하기를 누르면 여기에 반영됩니다.
          </p>
        ) : (
          <ul className="space-y-2">
            {myBookings.map((b) => (
              <li
                key={b.id}
                className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm"
              >
                <span className="text-slate-400">{b.date}</span>
                <span className="text-white">
                  {b.startTime} ~ {b.endTime}
                </span>
                <span className="font-medium text-cyan-400">
                  대표자: {b.representativeName}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
