import { create } from 'zustand';

interface pendingIdStore {
  id: string | null;
  setId: (newId: string) => void;
}

export const usePendingIdStore = create<pendingIdStore>(set => ({
  id: null,
  setId: newId => set({ id: newId }),
}));
