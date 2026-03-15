/**
 * SUMMIT 밴드 공연 일정 관련 TypeScript 인터페이스
 */

/** 공연 장소 정보 */
export interface Venue {
  /** 장소 이름 */
  name: string
  /** 주소 (선택) */
  address?: string
  /** 도시 */
  city: string
  /** 외부 링크 (예: 예매 페이지) */
  link?: string
}

/** 단일 공연 일정 */
export interface Show {
  /** 고유 ID */
  id: string
  /** 공연 날짜 (ISO 8601 또는 표시용 문자열) */
  date: string
  /** 공연 시작 시간 (예: "19:00") */
  time: string
  /** 공연 제목/이벤트명 */
  title: string
  /** 장소 정보 */
  venue: Venue
  /** 티켓/예매 링크 (선택) */
  ticketUrl?: string
  /** 한 줄 설명 (선택) */
  description?: string
  /** 이미지 URL (선택) */
  imageUrl?: string
}

/** 메인 섹션에 전달하는 공연 일정 목록 props */
export interface ScheduleSectionProps {
  /** 공연 일정 배열 */
  shows: Show[]
  /** 섹션 제목 (선택, 기본값 사용 가능) */
  title?: string
  /** 최대 표시 개수 (선택, 0이면 전부) */
  maxItems?: number
}
