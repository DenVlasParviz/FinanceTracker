"use client";
import Header from "@/components/header/Header";
import { FilterButtons } from "@/components/filterBar/FilterButtons";
import BudgetTable from "@/components/budgetTable/budgetTable";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Summary } from "@/components/summaryPanel/summary";
import { useState } from "react";
import { Category } from "@/types/category";
import { CategoriesProvider } from "@/components/context/categoriesContext";
import { BudgetProvider } from "@/components/context/budgetContext";
import { CategoryButtons } from "@/components/contentArea/categoryButtons";

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  return (
    <BudgetProvider>

    <CategoriesProvider>
      <div className="flex h-screen">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? "ml-[52px]" : "ml-[260px]"
          }`}
        >
          <Header />
          <FilterButtons />
          <div className="flex flex-1">
            <div className="flex-1 overflow-y-auto transition-all duration-300">
              <CategoryButtons />

              <BudgetTable onSelectCategory={(cat) => setSelectedCategoryId(cat.id)} />
            </div>
            <Summary selectedCategoryId={selectedCategoryId}  />
          </div>
        </div>
      </div>
    </CategoriesProvider>
    </BudgetProvider>
  );
}
