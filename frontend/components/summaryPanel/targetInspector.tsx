"use client";
import React, { useState } from "react";
import { Category } from "@/types/category";

interface TargetInspectorProps {
  category: Category;
}

export const TargetInspector = ({ category }: TargetInspectorProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCreatingTarget, setIsCreatingTarget] = useState(false);


  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
      {/*    Header    */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-t-lg"
      >
        <h2 className="text-sm font-semibold text-gray-800">Target</h2>
        <span className={`transition-transform ${isExpanded ? "" : "-rotate-90"}`}>
          ▼
        </span>

      </button>
      {/*Body*/}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          {!isCreatingTarget ? (
            <div className="space-y-3">
              <strong className="text-sm text-gray-800">
                How much do you need for {category.name}?
              </strong>
              <p className="text-sm text-gray-600">
                When you create a target, we will let you know how much money to set aside to stay on track over time.
              </p>
              <button
                onClick={() => setIsCreatingTarget(true)}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Create Target
              </button>

            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Monthly Savings Builder</option>
                  <option>Needed for Spending</option>
                  <option>Weekly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Amount
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsCreatingTarget(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: save target to DB
                    console.log("Save target for category:", category.id);
                    setIsCreatingTarget(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

          )
          }
        </div>
      )}

    </section>
  );
};
