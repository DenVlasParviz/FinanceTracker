import { MonthSelector } from "@/components/header/MonthSelector";
import { BudgetStatus } from "@/components/header/BudgetStatus";

export const Header = () => {
  return (

      <div className="flex items-center  px-5 py-5">
          <div className="flex-1 flex justify-start">
              <MonthSelector />
          </div>

          <div className="flex-1 flex justify-center">
              <BudgetStatus />
          </div>

          <div className="flex-1"></div> {/* пустое пространство для симметрии */}
      </div>
  );
};
export default Header;
