"use client";
import { BudgetTableRow } from "@/components/budgetTable/budgetTableRow";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";
import { getCategoriesTable } from "@/components/api/api";

export default function BudgetTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const cats: Category[] = await getCategoriesTable();

        setCategories(cats);
        setExpandedIds(cats.filter(c => c.isParent).map(c => c.id));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const toggleCheckbox = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat,
      ),
    );
  };

  const toggleCategory = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((i) => i !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };



  if (categories.length === 0) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div
        className="flex items-center border-b border-gray-300 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wide top-0 z-10"
        style={{ minHeight: "36px" }}
      >
        <div className="w-6 mr-2 pl-4"></div>
        <div className="w-4 mr-3"></div>
        <div className="flex-1 pr-4">Category</div>
        <div className="w-32 px-2 text-right">Assigned</div>
        <div className="w-32 px-2 text-right">Activity</div>
        <div className="w-32 px-2 text-right pr-4">Available</div>
      </div>
      {/* Rows */}
      <div>
        {categories.map((category) => {
          const isExpanded = expandedIds.includes(category.id);
          const shouldShow =
            category.isParent ||
            (category.parentId && expandedIds.includes(category.parentId));


          if (!shouldShow) return null;

          return (
            <BudgetTableRow
              key={category.id}
              category={category}
              isExpanded={isExpanded}
              onToggleExpand={
                category.isParent ? () => toggleCategory(category.id) : undefined
              }
              onToggleCheck={() => toggleCheckbox(category.id)}
            />
          );
        })}
      </div>
    </div>
  );
}