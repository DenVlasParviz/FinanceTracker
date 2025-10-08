    import { Category } from "@/types/category";



    export const BudgetTableRow = ({
      category,
      isExpanded,
      onToggleExpand,
      onToggleCheck,
    }: {
      category: Category;
      isExpanded?: boolean;
      onToggleExpand?: () => void;
      onToggleCheck?: () => void;
    }) => {
      const isParent = category.isParent;
      const isChild = category.level === 2;
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
            <button className="text-left text-sm text-black hover:underline truncate">

              {category.name}
            </button>
            {isParent && (
              <button
                className="flex-shrink-0 text-blue-500 hover:text-blue-600"
                aria-label="Add Category"
              >
                <span>+</span>
              </button>
            )}
          </div>
          {/*    Budgeted*/}

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
