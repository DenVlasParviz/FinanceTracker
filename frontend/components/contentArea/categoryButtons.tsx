// components/CategoryButtons.tsx
"use client";
import React from "react";
import { AddCategoryPopover } from "./AddCategoryPopover";

export const CategoryButtons = () => {
  const buttonClass =
    "flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-lime-700 transition-colors border border-transparent hover:border-lime-400 px-3 py-1.5 rounded-lg";

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 rounded-t-xl shadow-sm">
      {/* Add Category Group (popover) */}
      <div className="flex items-center">
        <AddCategoryPopover buttonClassName={buttonClass} />
      </div>

      {/* Undo / Redo */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-lime-700 border border-transparent hover:border-lime-400 px-3 py-1.5 rounded-lg transition">
          {/* undo svg */}
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 1 .908-.418A6 6 0 1 1 8 2v1z" />
            <path d="M7.5 0v4l-1.5-1.5L4.5 4l3.5 3.5L11.5 4l-1.5-1.5L7.5 4V0z" />
          </svg>
          Undo
        </button>

        <button className="flex items-center gap-1 text-sm font-medium text-gray-400 border border-transparent px-3 py-1.5 rounded-lg cursor-not-allowed" disabled>
          {/* redo svg */}
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 1 0-.908-.418A6 6 0 1 0 8 2v1z" />
            <path d="M8.5 0v4l1.5-1.5L11.5 4 8 7.5 4.5 4l1.5-1.5L8.5 4V0z" />
          </svg>
          Redo
        </button>
      </div>

      {/* Recent Moves */}
      <div className="flex items-center">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-lime-700 border border-transparent hover:border-lime-400 px-3 py-1.5 rounded-lg transition">
          {/* clock svg */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 1 .5.5v4l3 1.5a.5.5 0 1 1-.5.866L8 8.5V4a.5.5 0 0 1 .5-.5z" />
            <path d="M8 1a7 7 0 1 0 4.546 12.914.5.5 0 0 0-.908-.418A6 6 0 1 1 8 2V1z" />
          </svg>
          <div>Recent Moves</div>
        </button>
      </div>
    </div>
  );
};
