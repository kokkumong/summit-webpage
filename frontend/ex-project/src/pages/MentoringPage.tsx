/**
 * 멘토링 페이지
 * - 목록: 보컬, 일렉기타, 베이스, 신디, 드럼 5개 세션 선택
 * - 세부: 캘린더로 날짜 선택 + 멘토 선택 + 등록하기
 */

import { useState } from "react";
import {
  type MentoringSessionId,
  MENTORING_SESSION_LABELS,
  MENTORS_BY_SESSION,
  type MentoringSchedule,
} from "../types/mentoring";
import { MentoringCalendar } from "../components/MentoringCalendar";

const SESSION_IDS: MentoringSessionId[] = [
  "vocal",
  "electric",
  "bass",
  "synth",
  "drum",
];

export function MentoringPage() {
  const [selectedSessionId, setSelectedSessionId] =
    useState<MentoringSessionId | null>(null);
  const [schedules, setSchedules] = useState<MentoringSchedule[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<string>("");

  const sessionLabel = selectedSessionId
    ? MENTORING_SESSION_LABELS[selectedSessionId]
    : "";
  const mentors = selectedSessionId
    ? MENTORS_BY_SESSION[selectedSessionId]
    : [];

  const handleRegister = () => {
    if (!selectedSessionId || !selectedMentor || selectedDates.length === 0)
      return;
    const newOnes: MentoringSchedule[] = selectedDates.map((date, i) => ({
      id: `m-${Date.now()}-${i}-${date}`,
      sessionId: selectedSessionId,
      mentorName: selectedMentor,
      date,
    }));
    setSchedules((prev) => [...prev, ...newOnes]);
    setSelectedDates([]);
  };

  const sessionSchedules = selectedSessionId
    ? schedules.filter((s) => s.sessionId === selectedSessionId)
    : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      {selectedSessionId === null ? (
        <>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
            멘토링
          </h2>
          <p className="mb-6 text-neutral-400">
            세션을 선택하면 해당 멘토링 일정 등록 및 확인이 가능합니다.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SESSION_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSelectedSessionId(id);
                  setSelectedMentor(MENTORS_BY_SESSION[id][0] ?? "");
                  setSelectedDates([]);
                }}
                className="rounded-xl border border-neutral-700 bg-neutral-900/80 p-6 text-left transition hover:border-amber-500/50 hover:bg-neutral-800"
              >
                <span className="text-lg font-semibold text-white">
                  {MENTORING_SESSION_LABELS[id]} 멘토링
                </span>
                <p className="mt-1 text-sm text-neutral-400">
                  멘토 {MENTORS_BY_SESSION[id].length}명
                </p>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSelectedSessionId(null)}
              className="rounded-lg px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white"
            >
              ← 목록으로
            </button>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {sessionLabel} 멘토링
            </h2>
          </div>

          {/* 캘린더 UI */}
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-amber-400">
              멘토링 일정 선택
            </h3>
            <div className="max-w-md">
              <MentoringCalendar
                selectedDates={selectedDates}
                onSelectDates={setSelectedDates}
              />
            </div>
          </section>

          {/* 멘토 선택 + 등록하기 */}
          <section className="mb-8 rounded-xl border border-neutral-700 bg-neutral-900/80 p-4">
            <h3 className="mb-4 text-lg font-semibold text-amber-400">
              멘토 선택 및 등록
            </h3>
            <div className="flex flex-wrap items-end gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-xs text-neutral-400">멘토</span>
                <select
                  value={selectedMentor}
                  onChange={(e) => setSelectedMentor(e.target.value)}
                  className="rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-white min-w-[140px]"
                >
                  {mentors.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-400">
                  선택한 날짜 ({selectedDates.length}일)
                </span>
                <p className="text-sm text-neutral-300">
                  {selectedDates.length > 0
                    ? selectedDates.join(", ")
                    : "캘린더에서 날짜를 클릭하세요."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRegister}
                disabled={
                  selectedDates.length === 0 || !selectedMentor
                }
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500"
              >
                등록하기
              </button>
            </div>
          </section>

          {/* 등록된 일정 목록 */}
          {sessionSchedules.length > 0 && (
            <section className="rounded-xl border border-neutral-700 bg-neutral-900/80 p-4">
              <h4 className="mb-3 text-sm font-medium text-neutral-300">
                등록된 멘토링 일정
              </h4>
              <ul className="space-y-2">
                {sessionSchedules
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center gap-2 text-sm text-neutral-300"
                    >
                      <span className="text-white">{s.date}</span>
                      <span className="text-amber-400">{s.mentorName}</span>
                    </li>
                  ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>
  );
}
