import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";

import { getBudget, updateBudget } from "@/components/api/api";

export type BudgetDto = {
  id: string;
  total: number;
  assignedSum: number;
  available: number;
  updatedAt: string;
};


type BudgetContextType = {
  budget: BudgetDto | null;
  loading: boolean;
  error: Error | null;
  refreshBudget: () => Promise<void>;
  setBudgetLocally: (b: BudgetDto | null) => void;
};
const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({children}:{children:ReactNode}){
  const [budget, setBudget] = useState<BudgetDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


  const refreshBudget = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await updateBudget();
      const data = await getBudget();
      const normalized: BudgetDto = {
        id: data.id,
        total: Number(data.total ?? 0),
        assignedSum: Number(data.assignedSum ?? 0),
        available: Number(
          data.available
        ),
        updatedAt: data.updatedAt,
      };
      setBudget(normalized);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);
  const setBudgetLocally = useCallback((b: BudgetDto | null) => {
    setBudget(b);
  }, []);

  return(
    <BudgetContext.Provider value={{ budget, loading, error, refreshBudget, setBudgetLocally }}>
      {children}
    </BudgetContext.Provider>
  )

}
export function useBudget() {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error("useBudget must be used within BudgetProvider");
  return ctx;
}

