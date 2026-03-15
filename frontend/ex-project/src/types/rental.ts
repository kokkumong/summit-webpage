/**
 * 악기 대여·신디 사용 관련 타입
 */

/** 대여 가능 악기 종류 */
export type InstrumentKind = "electric-guitar" | "bass" | "acoustic-guitar";

/** 단일 악기 대여 정보 */
export interface InstrumentRental {
  id: string;
  kind: InstrumentKind;
  /** 대여 시작일 (YYYY-MM-DD) */
  startDate: string;
  /** 반납 예정일 (YYYY-MM-DD) */
  returnDate: string;
  /** 대여자 이름 */
  renterName: string;
  /** 대여 가능 여부 (false면 이미 대여 중) */
  available: boolean;
}

/** 신디사이저 사용 시간 슬롯 */
export interface SynthTimeSlot {
  id: string;
  /** 날짜 (YYYY-MM-DD) */
  date: string;
  /** 시작 시간 "HH:mm" */
  startTime: string;
  /** 종료 시간 "HH:mm" */
  endTime: string;
  /** 사용자 이름 */
  userName: string;
}
