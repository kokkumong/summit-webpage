/**
 * 악기 대여 사업 페이지
 * - 일렉기타, 베이스, 어쿠스틱 기타: 대여 기간, 반납 날짜, 대여 가능 현황
 * - 신디사이저: 사용 시간 예약
 */

import { useState } from "react";
import type { InstrumentRental, SynthTimeSlot } from "../types/rental";

const INSTRUMENT_LABELS: Record<string, string> = {
  "electric-guitar": "일렉 기타",
  bass: "베이스",
  "acoustic-guitar": "어쿠스틱 기타",
};

/** 30분 단위 시간 옵션 생성 (09:00 ~ 21:00) */
function getTimeOptions(): string[] {
  const options: string[] = [];
  for (let h = 9; h <= 21; h++) {
    options.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 21) options.push(`${String(h).padStart(2, "0")}:30`);
  }
  return options;
}

const TIME_OPTIONS = getTimeOptions();

export function InstrumentRentalPage() {
  const [rentals, setRentals] = useState<InstrumentRental[]>([
    {
      id: "1",
      kind: "electric-guitar",
      startDate: "2026-03-01",
      returnDate: "2026-03-15",
      renterName: "서은영",
      available: false,
    },
    {
      id: "2",
      kind: "electric-guitar",
      startDate: "",
      returnDate: "",
      renterName: "",
      available: true,
    },
    {
      id: "3",
      kind: "bass",
      startDate: "2026-03-10",
      returnDate: "2026-03-24",
      renterName: "정규호",
      available: false,
    },
    {
      id: "4",
      kind: "bass",
      startDate: "",
      returnDate: "",
      renterName: "",
      available: true,
    },
    {
      id: "5",
      kind: "acoustic-guitar",
      startDate: "",
      returnDate: "",
      renterName: "",
      available: true,
    },
  ]);

  const [synthSlots, setSynthSlots] = useState<SynthTimeSlot[]>([
    {
      id: "s1",
      date: "2026-03-16",
      startTime: "14:00",
      endTime: "15:30",
      userName: "한태영",
    },
  ]);

  // 신디 예약 폼 상태
  const [synthDate, setSynthDate] = useState("");
  const [synthStart, setSynthStart] = useState("14:00");
  const [synthEnd, setSynthEnd] = useState("14:30");
  const [synthUserName, setSynthUserName] = useState("");

  const handleAddSynthSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!synthDate || !synthUserName) return;
    setSynthSlots((prev) => [
      ...prev,
      {
        id: `s${Date.now()}`,
        date: synthDate,
        startTime: synthStart,
        endTime: synthEnd,
        userName: synthUserName,
      },
    ]);
    setSynthUserName("");
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
        악기 대여 사업
      </h2>

      {/* (1) 기타/베이스/어쿠스틱 대여 현황 */}
      <section className="mb-14">
        <h3 className="mb-4 text-lg font-semibold text-cyan-400">
          대여 가능 물품 현황
        </h3>
        <p className="mb-4 text-sm text-slate-400">
          일렉 기타, 베이스, 어쿠스틱 기타 대여 기간·반납 날짜·가능 현황
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/80">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/80">
                <th className="px-4 py-3 font-medium text-slate-200">악기</th>
                <th className="px-4 py-3 font-medium text-slate-200">
                  대여 기간
                </th>
                <th className="px-4 py-3 font-medium text-slate-200">
                  반납 날짜
                </th>
                <th className="px-4 py-3 font-medium text-slate-200">상태</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((r) => (
                <tr key={r.id} className="border-b border-slate-800">
                  <td className="px-4 py-3 text-white">
                    {INSTRUMENT_LABELS[r.kind] ?? r.kind}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {r.startDate || "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {r.returnDate || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {r.available ? (
                      <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-cyan-400">
                        대여 가능
                      </span>
                    ) : (
                      <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-violet-400">
                        대여 중 ({r.renterName})
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* (2) 신디사이저 사용 시간 */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-cyan-400">
          신디사이저 사용 시간
        </h3>
        <p className="mb-4 text-sm text-slate-400">
          사용 날짜와 시간을 선택해 예약하세요.
        </p>

        <form
          onSubmit={handleAddSynthSlot}
          className="mb-8 flex flex-wrap items-end gap-4 rounded-xl border border-slate-700 bg-slate-900/80 p-4"
        >
          <label className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">날짜</span>
            <input
              type="date"
              value={synthDate}
              onChange={(e) => setSynthDate(e.target.value)}
              className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">시작</span>
            <select
              value={synthStart}
              onChange={(e) => setSynthStart(e.target.value)}
              className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">종료</span>
            <select
              value={synthEnd}
              onChange={(e) => setSynthEnd(e.target.value)}
              className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">사용자</span>
            <input
              type="text"
              value={synthUserName}
              onChange={(e) => setSynthUserName(e.target.value)}
              placeholder="이름"
              className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-500"
              required
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
          >
            신디 사용 예약
          </button>
        </form>

        <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
          <h4 className="mb-3 text-sm font-medium text-slate-300">
            예약된 신디 사용 시간
          </h4>
          <ul className="space-y-2">
            {synthSlots.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center gap-2 text-sm text-slate-300"
              >
                <span className="text-white">{s.date}</span>
                <span>
                  {s.startTime} ~ {s.endTime}
                </span>
                <span className="text-cyan-400">{s.userName}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
