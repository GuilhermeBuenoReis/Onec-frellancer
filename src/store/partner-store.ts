// src/store/partnerStore.ts
import { create } from 'zustand';

export interface Partner {
  id: number;
  name: string;
}

export interface PartnerStore {
  partners: Partner[];
  addPartner: (partner: Partner) => void;
  removePartner: (id: number) => void;
}

export const usePartnerStore = create<PartnerStore>(set => ({
  partners: [
    { id: 1, name: 'João' },
    { id: 2, name: 'Maria' },
    { id: 3, name: 'João' },
    { id: 3, name: 'Guilhermex' },
  ],
  addPartner: (partner: Partner) => {
    set(state => ({ partners: [...state.partners, partner] }));
  },
  removePartner: (id: number) => {
    set(state => ({ partners: state.partners.filter(p => p.id !== id) }));
  },
}));
