/**
 * 멘토링 세션 및 일정 타입
 */

/** 세션 구분: 보컬, 일렉기타, 베이스, 신디(건반), 드럼 */
export type MentoringSessionId =
  | "vocal"
  | "electric"
  | "bass"
  | "synth"
  | "drum";

/** 세션 한글 라벨 */
export const MENTORING_SESSION_LABELS: Record<MentoringSessionId, string> = {
  vocal: "보컬",
  electric: "일렉기타",
  bass: "베이스",
  synth: "신디",
  drum: "드럼",
};

/** 세션별 멘토 목록 (요청하신 분들로 등록) */
export const MENTORS_BY_SESSION: Record<MentoringSessionId, string[]> = {
  vocal: ["전혜린", "임혜원"],
  electric: ["김경수", "이찬혁", "서은영", "조우식", "좌상엽"],
  bass: ["정규호", "하정훈"],
  synth: ["한태영", "이태경", "박성연"],
  drum: ["김하준", "이예찬", "최지훈", "조세진", "서윤제", "전영진"],
};

/** 등록된 멘토링 일정 한 건 */
export interface MentoringSchedule {
  id: string;
  sessionId: MentoringSessionId;
  /** 멘토 이름 */
  mentorName: string;
  /** 멘토링 날짜 (YYYY-MM-DD) */
  date: string;
}
