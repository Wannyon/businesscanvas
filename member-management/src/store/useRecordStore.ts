import { create } from 'zustand';
import { isLocalStorage } from '../utils/storage';
import { Record } from '../types/recode.ts';
import { initialData } from './initialData.ts';

type Store = {
  records: Record[];
  addRecord: (record: Record) => void;
  deleteRecord: (id: number) => void;
  updateRecord: (updated: Record) => void;
};

export const useRecordStore = create<Store>((set) => ({
  records: initialData,
  addRecord: (record) =>
    set((state) => {
      const updatedRecords = [...state.records, record];
      if (isLocalStorage) {
        localStorage.setItem('records', JSON.stringify(updatedRecords));
      }
      return { records: updatedRecords };
    }),
  deleteRecord: (id) =>
    set((state) => {
      const updatedRecords = state.records.filter((r) => r.id !== id);
      if (isLocalStorage) {
        localStorage.setItem('records', JSON.stringify(updatedRecords));
      }
      return { records: updatedRecords };
    }),
  updateRecord: (updated) =>
    set((state) => {
      const updatedRecords = state.records.map((r) =>
        r.id === updated.id ? updated : r,
      );
      if (isLocalStorage) {
        localStorage.setItem('records', JSON.stringify(updatedRecords));
      }
      return { records: updatedRecords };
    }),
}));
