'use client';

import { createContext, useContext, useState } from 'react';
import type { UpdatePortalControllMutationRequest } from '@/generated';

interface SelectedControllContextType {
  selectedControllId?: string;
  selectedControllData?: UpdatePortalControllMutationRequest & {
    id: string;
  };
  setSelectedControllId: (id: string) => void;
  setSelectedControllData: (
    data: (UpdatePortalControllMutationRequest & { id: string }) | undefined
  ) => void;
}

const SelectedControllContext =
  createContext<SelectedControllContextType | null>(null);

export function SelectedControllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedControllId, setSelectedControllId] = useState<string>();
  const [selectedControllData, setSelectedControllData] = useState<
    (UpdatePortalControllMutationRequest & { id: string }) | undefined
  >();

  return (
    <SelectedControllContext.Provider
      value={{
        selectedControllId,
        selectedControllData,
        setSelectedControllId,
        setSelectedControllData,
      }}
    >
      {children}
    </SelectedControllContext.Provider>
  );
}

export const useSelectedControllContext = () => {
  const ctx = useContext(SelectedControllContext);
  if (!ctx)
    throw new Error(
      'useSelectedControllContext precisa estar dentro do SelectedControllProvider'
    );
  return ctx;
};
