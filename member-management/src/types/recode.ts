// 필드 타입 정의
export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox';

// 직업 타입 정의 (직업 추가 가능)
export type JobType = '개발자' | 'PO' | '디자이너' | '인턴';

// 회원 레코드 타입 정의
export type Record = {
  id: number;
  name: string;
  address: string;
  memo: string;
  joinedAt: string;
  job: JobType;
  emailConsent: boolean;
};

// 필드 메타데이터 (테이블 컬럼 정의)
export type FieldMetadata = {
  key: keyof Record; // Record 타입의 키값 사용
  label: string; // UI에서 보여줄 필드명
  type: FieldType; // 필드 타입
  required: boolean; // 필수 입력 여부
};

// 테이블에서 사용할 필드 정의
export const fieldsMetadata: FieldMetadata[] = [
  { key: 'name', label: '이름', type: 'text', required: true },
  { key: 'address', label: '주소', type: 'text', required: false },
  { key: 'memo', label: '메모', type: 'textarea', required: false },
  { key: 'joinedAt', label: '가입일', type: 'date', required: true },
  { key: 'job', label: '직업', type: 'select', required: false },
  {
    key: 'emailConsent',
    label: '이메일 수신 동의',
    type: 'checkbox',
    required: false,
  },
];
