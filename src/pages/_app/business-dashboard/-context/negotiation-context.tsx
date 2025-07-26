'use client';

import { createContext, useContext, useState } from 'react';
import type { UpdateNegotiationMutationResponse } from '@/generated';

interface NogotiationContextType {
  negotiationId: string;
  setnegotiationId: (id: string) => void;
  negotiationData: UpdateNegotiationMutationResponse | null;
  setNegotiationData: (data: UpdateNegotiationMutationResponse | null) => void;
}

const NegotiationContext = createContext<NogotiationContextType | null>(null);

export function NegotiationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [negotiationId, setnegotiationId] = useState<string>('');
  const [negotiationData, setNegotiationData] =
    useState<UpdateNegotiationMutationResponse | null>(null);

  return (
    <NegotiationContext.Provider
      value={{
        negotiationId,
        setnegotiationId,
        negotiationData,
        setNegotiationData,
      }}
    >
      {children}
    </NegotiationContext.Provider>
  );
}

export function useNegotiationContext() {
  const context = useContext(NegotiationContext);
  if (!context) {
    throw new Error(
      'useContractContext must be used within a ContractProvider'
    );
  }
  return context;
}
