"use client"
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Category, CategoryTarget } from "@/types/category";
import { getCategoriesTable } from "@/components/api/api";


interface CategoriesContextType {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  refreshCategories: () => Promise<void>;
  updateCategoryTarget: (categoryId: string, target: CategoryTarget) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getCategoriesTable();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateCategoryTarget = (categoryId: string, target: CategoryTarget) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, targets: [target] }
          : cat
      )
    );
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        error,
        refreshCategories: fetchCategories,
        updateCategoryTarget
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within CategoriesProvider');
  }
  return context;
}