'use client';

import { createContext, useContext, useState } from 'react';
import type { UpdateContract200 } from '@/generated';

interface ContractContextType {
  id: string;
  setId: (id: string) => void;
  contractData: UpdateContract200 | null;
  setContractData: (data: UpdateContract200 | null) => void;
}

const ContractContext = createContext<ContractContextType | null>(null);

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<string>('');
  const [contractData, setContractData] = useState<UpdateContract200 | null>(
    null
  );

  return (
    <ContractContext.Provider
      value={{ id, setId, contractData, setContractData }}
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
