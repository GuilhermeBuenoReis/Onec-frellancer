'use client';

import { createContext, useContext, useState } from 'react';
import type { UpdatePortalControll200 } from '@/generated';

interface PortalControllContextType {
  controllId: string;
  setControllId: (id: string) => void;
  controllData: UpdatePortalControll200 | null;
  setControllData: (data: UpdatePortalControll200 | null) => void;
}

const PortalControllContext = createContext<PortalControllContextType | null>(
  null
);

export function PortalControllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [controllId, setControllId] = useState('');
  const [controllData, setControllData] =
    useState<UpdatePortalControll200 | null>(null);

  return (
    <PortalControllContext.Provider
      value={{
        controllId,
        setControllId,
        controllData,
        setControllData,
      }}
    >
      {children}
    </PortalControllContext.Provider>
  );
}

export function usePortalControllContext() {
  const context = useContext(PortalControllContext);
  if (!context) {
    throw new Error(
      'usePortalControllContext deve ser usado dentro de PortalControllProvider'
    );
  }
  return context;
}
