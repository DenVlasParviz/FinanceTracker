"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAccounts, createAccount, updateAccount } from "@/components/api/api";

export type Account = {
  id: string;
  name: string;
  balance: number;
  createdAt?: string;
  updatedAt?: string;
};

interface AccountsContextType {
  accounts: Account[];
  isLoading: boolean;
  refresh: () => Promise<void>;
  create: (name: string, balance?: number) => Promise<Account>;
  update: (id: string, payload: { name?: string; balance?: number }) => Promise<Account>;
}

const AccountsContext = createContext<AccountsContextType | undefined>(undefined);

export function AccountsProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const data = await getAccounts();
      setAccounts(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const create = async (name: string, balance?: number) => {
    const created = await createAccount({ name, balance });
    setAccounts(prev => [created, ...prev]);
    return created;
  };

  const update = async (id: string, payload: { name?: string; balance?: number }) => {
    const updated = await updateAccount(id, payload);
    setAccounts(prev => prev.map(a => (a.id === id ? updated : a)));
    return updated;
  };

  return (
    <AccountsContext.Provider value={{ accounts, isLoading, refresh, create, update }}>
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccounts() {
  const ctx = useContext(AccountsContext);
  if (!ctx) throw new Error("useAccounts must be used within AccountsProvider");
  return ctx;
}
