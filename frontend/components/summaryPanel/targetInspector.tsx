"use client";
import React, { useEffect, useState } from "react";
import { Category, CategoryTarget } from "@/types/category";
import {formatCurrency} from "@/components/common/format";
import { addCategoryTarget, updateTarget } from "../api/api";
import { useCategories } from "@/components/context/categoriesContext";

interface TargetInspectorProps {
  category: Category;
}



export const TargetInspector = ({ category }: TargetInspectorProps) => {
  const { updateCategoryTarget, refreshCategories } = useCategories();

  const [isExpanded, setIsExpanded] = useState(true);
  const [isCreatingTarget, setIsCreatingTarget] = useState(false);
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [targetType, setTargetType] = useState<string>("monthly");



  const targetData = category.targets && category.targets.length > 0
    ? category.targets[0]
    : null;



  const calculateProgress = () => {
    if (!targetData) return 0;
    return Math.min((targetData.assignedSoFar / targetData.targetAmount) * 100, 100);
  };
  const toGo = targetData
    ? Math.max(targetData.targetAmount - targetData.assignedSoFar, 0)
    : 0;

  const progress = calculateProgress();
  const isComplete = progress >= 100;

  useEffect(() => {
    setIsCreatingTarget(false);
    setTargetAmount(0);
    setTargetType("monthly");
  }, [category.id]);

  const handleSaveTarget = async () => {
    try {
      const tempTarget: CategoryTarget = {
        id: crypto.randomUUID(),
        categoryId: category.id,
        targetAmount: targetAmount,
        assignedSoFar: 0,
        targetType: targetType,
        targetDate: "2025-10-31", // change date later
        isComplete: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateCategoryTarget(category.id, tempTarget);
      setIsCreatingTarget(false);
if(targetData){
  await updateTarget(targetData.id,tempTarget);
}
else{
  await addCategoryTarget(tempTarget)

}

    } catch (error) {
      console.error("Failed to save target:", error);
      await refreshCategories();
    }
  };
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
      {/*    Header    */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-t-lg"
      >
        <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          {/*Progress bar*/}
          {targetData && (
            <span className={`w-4 h-4 rounded-full ${isComplete ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          )}
          Target
        </h2>
        <h2 className="text-sm font-semibold text-gray-800">Target</h2>
        <span className={`transition-transform ${isExpanded ? "" : "-rotate-90"}`}>
          ▼
        </span>

      </button>
      {/*Body*/}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4">

          {!targetData && !isCreatingTarget ? (
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
          ) : isCreatingTarget ? (
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
                  onChange={(e)=>setTargetAmount(parseInt(e.target.value ) || 0)}

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
                  onClick={handleSaveTarget}

                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-800">
                  Set Aside Another ${formatCurrency(targetData!.targetAmount)} Each Month
                </h3>
                <div className="text-xs text-gray-600">{targetData!.targetDate}</div>
              </div>
              <hr className="border-gray-200" />
            {/*  Progress */}
              <div className="flex justify-center py-4">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isComplete ? (
                      <span className="text-2xl">✓</span>
                    ) : (
                      <span className="text-lg font-semibold">{Math.round(progress)}%</span>
                    )}
                  </div>
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke={isComplete ? "#10b981" : "#f59e0b"}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(progress / 100) * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            {/*  Impact message*/}
              <div className={`p-3 rounded-lg ${isComplete ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <div className="text-sm text-center">
                  {isComplete ? (
                    <span className="text-green-800 font-medium">You have met your target!</span>
                  ) : (
                    <>
                      <span className="text-gray-700">Assign </span>
                      <span className="font-semibold text-yellow-800">${formatCurrency(toGo)} more</span>
                      <span className="text-gray-700"> to meet your target</span>
                    </>
                  )}
              </div>
                {!isComplete && (
                  <button className="w-full mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors">
                    Assign
                  </button>
                )}
              </div>
            {/*  Target breakdown*/}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount to Assign This Month</span>
                  <span className="font-mono font-semibold">${formatCurrency(targetData!.targetAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Assigned So Far</span>
                  <span className="font-mono font-semibold">${formatCurrency(targetData!.assignedSoFar)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between">
                  <span className="text-gray-600">To Go</span>
                  <span className="font-mono font-semibold">${formatCurrency(toGo)}</span>
                </div>
              </div>
              <button
                onClick={() => setIsCreatingTarget(true)}
                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg transition-colors"
              >
                Edit Target
              </button>

            </div>
          )
          }
        </div>
      )}

    </section>
  );
};
