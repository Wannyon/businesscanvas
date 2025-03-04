import { JobType, Record } from '../types/recode.ts';
import { isLocalStorage } from '../utils/storage.ts';

// 초기 데이터 설정
export const initialData: Record[] = isLocalStorage
  ? JSON.parse(localStorage.getItem('records') || '[]')
  : [
      {
        id: 1,
        name: '재원',
        address: '서울 관악구',
        memo: '한국인',
        joinedAt: '2021-10-02',
        job: '인턴' as JobType,
        emailConsent: true,
      },
      {
        id: 2,
        name: '민정',
        address: '서울 서초구',
        memo: '외국인',
        joinedAt: '2024-11-01',
        job: '디자이너' as JobType,
        emailConsent: false,
      },
      {
        id: 3,
        name: '태정',
        address: '서울 마포구',
        memo: '한국인',
        joinedAt: '2024-12-01',
        job: 'PO' as JobType,
        emailConsent: true,
      },
      {
        id: 4,
        name: '지환',
        address: '서울 동작구',
        memo: '한국인',
        joinedAt: '2023-10-01',
        job: '개발자' as JobType,
        emailConsent: false,
      },
    ];
