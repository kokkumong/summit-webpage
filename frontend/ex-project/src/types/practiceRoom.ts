/**
 * 소모임실 예약 관련 타입
 */

/** 30분 단위 시간 슬롯 (예: "09:00", "09:30") */
export type TimeSlot = string;

/** 단일 예약 정보 */
export interface PracticeRoomBooking {
  id: string;
  /** 예약 날짜 (YYYY-MM-DD) */
  date: string;
  /** 시작 시간 "HH:mm" */
  startTime: string;
  /** 종료 시간 "HH:mm" (30분 단위) */
  endTime: string;
  /** 대표자 이름 */
  representativeName: string;
}
