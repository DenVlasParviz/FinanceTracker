"use client";
import Header from "@/components/header/Header";
import { FilterButtons } from "@/components/filterBar/FilterButtons";
import BudgetTable from "@/components/budgetTable/budgetTable";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Summary } from "@/components/summaryPanel/summary";
import { useState } from "react";

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  return (
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
            <BudgetTable />
          </div>
          <Summary />
        </div>
      </div>
    </div>
  );
}
