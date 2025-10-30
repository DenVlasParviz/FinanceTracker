  import { useEffect } from "react";
  import { useBudget } from "@/components/context/budgetContext";



  export const BudgetStatus = () => {

    const { budget , error, refreshBudget } = useBudget();

    useEffect(() => {
      refreshBudget();

    },[refreshBudget]);
    if (error) return <div>Error</div>;

    return (
      <div className="bg-lime-400 flex items-center gap-4 p-4 rounded-2xl">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700">  {budget ? `$${budget.available.toLocaleString()}` : "$—"}</span>
          <div className="text-sm text-gray-700">Ready to assign</div>
        </div>
        <button className="bg-lime-700 text-white font-bold px-4 py-2 rounded-lg">
          Assign
        </button>
      </div>
    );
  };
