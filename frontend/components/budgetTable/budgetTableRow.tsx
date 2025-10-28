"use client";
import { Category } from "@/types/category";
import React, { useEffect, useState } from "react";
import { createCategory, updateCategory } from "@/components/api/api";
import { useCategories } from "@/components/context/categoriesContext";
import {useBudget} from "@/components/context/budgetContext";
import { AddCategoryPopover } from "@/components/contentArea/AddCategoryPopover";


export const BudgetTableRow = ({
  category,
  isExpanded,
  onToggleExpand,
  onToggleCheck,
  onSelectCategory,
}: {
  category: Category;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onToggleCheck?: () => void;
  onSelectCategory?: (category: Category) => void;
}) => {
  /*  const isParent = category.isParent;
      const isChild = category.level === 2;*/
  const isParent = category.parentId == null;
  const isChild = category.parentId != null;
  const [editingField, setEditingField] = useState<null | "name" | "assigned">(
    null,
  );


const {refreshBudget} = useBudget();

  const {
    applyLocalCategoryAssigned,
    applyServerCategoryUpdate,
    addCategoryLocally,
    refreshCategories,
  } = useCategories();

  const [draftName, setDraftName] = useState<string>(category.name);
  const [draftAssigned, setDraftAssigned] = useState<string>(
    category.assigned?.toFixed(2) ?? "0.00",
  );


  const handleCreatedChild = async (name: string) => {
    try{
      const created= await createCategory(name,category.id);
      if(!("targets" in created)) (created as any).targets = [];
      addCategoryLocally(created)
      await refreshBudget()
    }catch(e){
      console.log("created child failed",e);
    }
  }


  useEffect(() => {
    setDraftName(category.name);
    setDraftAssigned((category.assigned ?? 0).toFixed(2));
  }, [category.name, category.assigned]);

  const startEdit = (field: typeof editingField) => {
    if (field === "assigned" && !isChild) return; // allow assigned editing only for child
    setEditingField(field);
  };
  const cancelEdit = () => {
    setDraftName(category.name);
    setDraftAssigned((category.assigned ?? 0).toFixed(2));
    setEditingField(null);
  };
  type UpdateCategoryPayload = {
    name?: string;
    assigned?: number;
  }; // TODO move to other script

  const saveEdit = async () => {
    console.log("Save:", {
      name: draftName,
      assigned: parseFloat(draftAssigned),
    });
    const payload: UpdateCategoryPayload = {};
    if (editingField === "name") payload.name = draftName;
    if (editingField === "assigned")
      payload.assigned = parseFloat(draftAssigned);
    const isAssignEdit = editingField === "assigned" && isChild;
    try{
      if(isAssignEdit){
        applyLocalCategoryAssigned(category.id,payload.assigned!);
      }
      const res = await updateCategory(category.id, payload);
      applyServerCategoryUpdate(res);
      await refreshBudget()
      setEditingField(null);
    }catch(err){
      console.error("Failed to save:", err);
      await refreshCategories();
      setEditingField(null);
    }

  };
  const handleKeyDown = (
    e: React.KeyboardEvent,
    field: typeof editingField,
  ) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };
  return (
    <div
      className={`
            flex items-center border-b border-gray-700   hover:bg-gray-50
            ${isParent ? "bg-gray-100 font-semibold" : "bg-white"}
            ${isChild ? "pl-8" : "pl-4"}
          `}
      style={{ minHeight: "44px" }}
      role="row"
      aria-level={category.level}
      onClick={() => onSelectCategory?.(category)}
    >
      {/*Collapse button*/}
      <div className="w-6 mr-2 ">
        {isParent && (
          <button
            onClick={onToggleExpand}
            className="w-5 h-5 flex items-center justify-center bg-gray-400 hover:bg-gray-600 rounded"
            aria-label={`${isExpanded ? "Collapse" : "Expand"} ${category.name}`}
          >
            <span className="text-xl">{isExpanded ? "▼" : "▶"}</span>
          </button>
        )}
      </div>

      {/*    checkBox*/}
      <button
        onClick={onToggleCheck}
        className={`
              w-4 h-4 mr-3 rounded border flex items-center justify-center flex-shrink-0
              ${category.checked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}
              hover:border-gray-400
            `}
        role="checkbox"
        aria-checked={category.checked}
        aria-label={category.name}
      >
        {category.checked && <span>✓</span>}
      </button>

      {/*    Category Name*/}
      <div className="flex-1 flex items-center gap-2 min-w-0 pr-4">
        {editingField === "name" ? (
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => handleKeyDown(e, "name")}
            autoFocus
            className="flex-1 px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none focus:ring-2   text-black focus:ring-blue-500"
          />
        ) : (
          <button
            onClick={() => startEdit("name")}
            className="text-left text-sm text-black hover:underline truncate"
          >
            {draftName}
          </button>
        )}
        {isParent && (
          <div className="flex-shrink-0">
            <AddCategoryPopover
              buttonClassName="inline-flex items-center justify-center w-8 h-8 p-0 rounded hover:bg-gray-100"
              buttonChildren={
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path d="M8 1a.75.75 0 0 1 .75.75V7h5.25a.75.75 0 0 1 0 1.5H8.75v5.25a.75.75 0 0 1-1.5 0V8.5H2a.75.75 0 0 1 0-1.5h5.25V1.75A.75.75 0 0 1 8 1z"/>
                </svg>
              }
              onCreate={handleCreatedChild}
              panelWidth={280}
            />
          </div>
        )}
      </div>
      {/*    Assigned*/}
      <div className="w-32 px-2 text-right">
        {editingField === "assigned" ? (
          <input
            type="text"
            value={draftAssigned}
            onChange={(e) => setDraftAssigned(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => handleKeyDown(e, "assigned")}
            autoFocus
            className="w-full px-2 py-1 text-sm border text-black border-blue-500 rounded text-right font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <button
            onClick={() => startEdit("assigned")}
            disabled={!isChild}
            className={`
              w-full px-2 py-1 text-sm rounded text-right font-mono
              ${isChild ? "hover:bg-blue-50 text-gray-600 cursor-pointer" : "text-gray-400 cursor-not-allowed"}
            `}
          >
            ${draftAssigned}
          </button>
        )}
      </div>
      <div className="w-32 px-2 text-right">
        <button className="w-full px-2 py-1 text-sm rounded hover:bg-blue-50 text-right font-mono text-gray-600">
          $
          {category.activity.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </button>
      </div>
      {/* Available */}
      <div className="w-32 px-2 text-right pr-4">
        <button
          className={`
              w-full px-2 py-1 text-sm rounded hover:bg-blue-50 text-right font-mono font-semibold
              ${category.available > 0 ? "text-green-600" : category.available < 0 ? "text-red-600" : "text-gray-600"}
            `}
        >
          $
          {category.available.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </button>
      </div>
    </div>
  );
};
