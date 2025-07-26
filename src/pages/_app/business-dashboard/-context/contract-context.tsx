'use client';

import { createContext, useContext, useState } from 'react';
import type { UpdateContractMutationResponse } from '@/generated';

interface ContractContextType {
  contractId: string;
  setContractId: (id: string) => void;
  contractData: UpdateContractMutationResponse | null;
  setContractData: (data: UpdateContractMutationResponse | null) => void;
}

const ContractContext = createContext<ContractContextType | null>(null);

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const [contractId, setContractId] = useState<string>('');
  const [contractData, setContractData] =
    useState<UpdateContractMutationResponse | null>(null);

  return (
    <ContractContext.Provider
      value={{ contractId, setContractId, contractData, setContractData }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export function useContractContext() {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error(
      'useContractContext must be used within a ContractProvider'
    );
  }
  return context;
}
