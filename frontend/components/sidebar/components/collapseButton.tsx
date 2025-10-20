"use client";

interface CollapseButtonProps {
  toggleCollapse: () => void;
  isCollapsed: boolean;
}

export const CollapseButton = ({
  toggleCollapse,
  isCollapsed,
}: CollapseButtonProps) => {
  return (
    <div className="mt-auto p-2 flex justify-end">
      <button
        onClick={toggleCollapse}
        className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-700 transition-colors duration-150"
      >
        <span
          className={`transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        >
          ⏴
        </span>
      </button>
    </div>
  );
};
