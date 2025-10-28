"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Category, CategoryTarget } from "@/types/category";
import { getCategoriesTable } from "@/components/api/api";

interface CategoriesContextType {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  refreshCategories: () => Promise<void>;
  updateCategoryTarget: (categoryId: string, target: CategoryTarget) => void;
  applyLocalCategoryAssigned: (categoryId: string, assigned: number) => void;
  applyServerCategoryUpdate: (payload: {
    updatedChild: Category;
    updatedParent?: Category | null;
  }) => void;
  addCategoryLocally: (category: Category) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined,
);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const applyLocalCategoryAssigned = (categoryId: string, assigned: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, assigned } : c)),
    );
  };

  const applyServerCategoryUpdate = (payload: { updatedChild: Category; updatedParent?: Category | null }) => {
    setCategories(prev => {
      const map = new Map(prev.map(c => [c.id, c]));

      const oldChild = map.get(payload.updatedChild.id);
      const childTargets = (payload.updatedChild as any).targets ?? oldChild?.targets ?? [];
      const mergedChild = { ...payload.updatedChild, targets: childTargets };
      map.set(mergedChild.id, mergedChild);

      if (payload.updatedParent) {
        const oldParent = map.get(payload.updatedParent.id);
        const mergedParent = { ...payload.updatedParent, targets: oldParent?.targets ?? [] };
        map.set(payload.updatedParent.id, mergedParent);
      }

      return prev.map(c => map.get(c.id) ?? c);
    });
  };

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
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, targets: [target] } : cat,
      ),
    );
  };
  const addCategoryLocally = (category:Category) => {
    setCategories((prev) =>{
      return [category,...prev]
    });
  }

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        error,
        refreshCategories: fetchCategories,
        updateCategoryTarget,
        applyLocalCategoryAssigned,
        applyServerCategoryUpdate,
        addCategoryLocally,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within CategoriesProvider");
  }
  return context;
}
