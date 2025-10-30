"use client";
import { BudgetTableRow } from "@/components/budgetTable/budgetTableRow";
import { Category } from "@/types/category";
import { useMemo, useState } from "react";
import { useCategories } from "@/components/context/categoriesContext";

interface BudgetTableProps {
  onSelectCategory?: (cat: Category) => void;
}

export default function BudgetTable({ onSelectCategory }: BudgetTableProps) {
  const { categories } = useCategories();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  //  one time sort when something changes
  const sortedCategories = useMemo(() => {
    const parents = categories.filter((c) => c.parentId === null);
    const children = categories.filter((c) => c.parentId !== null);

    parents.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    const sorted: Category[] = [];

    parents.forEach((parent) => {
      sorted.push(parent);

      const parentChildren = children
        .filter((child) => child.parentId === parent.id)
        .sort((a, b) => parseInt(a.id) - parseInt(b.id));

      sorted.push(...parentChildren);
    });

    return sorted;
  }, [categories]);

  useState(() => {
    const parentIds = sortedCategories
      .filter((c) => c.isParent)
      .map((c) => c.id);
    setExpandedIds(parentIds);
  });

  const toggleCheckbox = (id: string) => {
    console.log("Toggle checkbox for category:", id);
  };

  const toggleCategory = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((i) => i !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };



  if (sortedCategories.length === 0) {
    return <div className="p-4 text-gray-500">No categories found</div>;
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
        {sortedCategories.map((category) => {
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
                category.isParent
                  ? () => toggleCategory(category.id)
                  : undefined
              }
              onToggleCheck={() => toggleCheckbox(category.id)}
              onSelectCategory={onSelectCategory}
            />
          );
        })}
      </div>
    </div>
  );
}
