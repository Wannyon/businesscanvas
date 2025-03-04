// 환경 변수 관리
const STORAGE = import.meta.env.VITE_STORAGE || 'in-memory'; // 디폴트 값 (local).

export const isLocalStorage = STORAGE === 'local-storage';