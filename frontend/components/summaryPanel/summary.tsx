"use client";
import React, { useState } from "react";
import { Category } from "@/types/category";
import { TargetInspector } from "@/components/summaryPanel/targetInspector";

interface SummaryData {
  leftOver: number;
  assigned: number;
  activity: number;
  available: number;
  targetAmount: number;
}

interface SummaryProps {
  selectedCategory: Category | null;
}
export const Summary = ({selectedCategory}:SummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const data: SummaryData = {
    leftOver: 0,
    assigned: 5646,
    activity: 0,
    available: 5646,
    targetAmount: 5290,
  }; // TODO: REMOVE IN THE FUTURE WHEN ADDED SERVER-SIDE SYNC
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  return (

    <aside className="w-[320px] min-w-[320px] max-w-[500px] bg-[#f8f6f2] p-4 shadow-md border-l border-gray-200 overflow-y-auto">
      {/*  Target Inspector*/}
      {selectedCategory && !selectedCategory.isParent && (
        <TargetInspector category={selectedCategory} />
      )}
      <section className="border-gray-200 bg-white flex rounded-lg shadow-sm text-black  flex-col ">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-t-lg"
        >
          <h2>Months summary</h2>
          <span
            className={`transition-transform ${isExpanded ? "" : "-rotate-90"}`}
          >
            ▼
          </span>
        </button>

        {/*    Body*/}
        {isExpanded && (
          <div className="border-t border-gray-200 ">
            <div className="px-4 pb-4 mt-2">
              <div className="pb-2">
                <div className="breakdown-leftover-prev-month">
                  <div className="text-sm text-gray-700">
                    Left over from last Month
                  </div>
                  <div className="text-sm font-mono font-semibold">
                    {formatCurrency(data.leftOver)}
                  </div>
                </div>

                <div className="breakdown-assigned-in-moth">
                  <div className="text-sm text-gray-700">Assigned in Month</div>
                  <div className="text-sm font-mono font-semibold">
                    {formatCurrency(data.assigned)}
                  </div>
                </div>
                <div className="breakdown-activity">
                  <div className="text-sm text-gray-700">Activity</div>
                  <div className="text-sm font-mono font-semibold">
                    {formatCurrency(data.activity)}
                  </div>
                </div>
                <div className="breakdown-available   ">
                  <div className="text-sm text-gray-700">Available</div>
                  <div className="text-sm font-mono font-semibold">
                    {formatCurrency(data.available)}
                  </div>
                </div>
              </div>
              {/*Separator*/}
              <div className="border-t border-gray-200 my-4"></div>
              {/*    Cost to be me ?*/}

              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-800">
                  Cost to be me
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600"> Month targets</span>
                  <span className="text-sm font-mono font-semibold text-gray-800">
                    {" "}
                    {formatCurrency(data.targetAmount)}
                  </span>
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                  Enter your expected income
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

    </aside>
  );
};
