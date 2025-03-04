import { create } from "zustand";
import { isLocalStorage } from "../utils/storage";

type Record = {
    id: number;
    name: string;
    address: string;
    memo: string;
    joinedAt: string;
    job: "개발자" | "인턴" | "디자이너";
    emailConsent: boolean;
};

type Store = {
    records: Record[];
    addRecord: (record: Record) => void;
    deleteRecord: (id: number) => void;
    updateRecord: (updated: Record) => void;
};

export const useRecordStore = create<Store>((set) => {
    // 초기 데이터 설정
    const initialData: Record[] = isLocalStorage
        ? JSON.parse(localStorage.getItem("records") || "[]") // localStorage 사용 시 데이터 로드
        : [
            {
                id: 1,
                name: "윤구",
                address: "서울 강남구",
                memo: "시니어 개발자",
                joinedAt: "2021-10-02",
                job: "개발자",
                emailConsent: true,
            },
            {
                id: 2,
                name: "재원",
                address: "서울 서초구",
                memo: "한국인",
                joinedAt: "2024-10-01",
                job: "인턴",
                emailConsent: false,
            },
        ];

    return {
        records: initialData,
        addRecord: (record) =>
            set((state) => {
                const updatedRecords = [...state.records, record];
                if (isLocalStorage) {
                    localStorage.setItem("records", JSON.stringify(updatedRecords));
                }
                return { records: updatedRecords };
            }),
        deleteRecord: (id) =>
            set((state) => {
                const updatedRecords = state.records.filter((r) => r.id !== id);
                if (isLocalStorage) {
                    localStorage.setItem("records", JSON.stringify(updatedRecords));
                }
                return { records: updatedRecords };
            }),
        updateRecord: (updated) =>
            set((state) => {
                const updatedRecords = state.records.map((r) =>
                    r.id === updated.id ? updated : r
                );
                if (isLocalStorage) {
                    localStorage.setItem("records", JSON.stringify(updatedRecords));
                }
                return { records: updatedRecords };
            }),
    };
});