import { CollapseText } from "@/components/common/collapseText";

interface AddAccountButtonProps {
  isCollapsed: boolean;
}

export const AddAccountButton = ({ isCollapsed }: AddAccountButtonProps) => {
  return (
    !isCollapsed && (
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-[#383ca3] rounded hover:bg-blue-800 transition-colors duration-150"
      >
        <svg className="w-3 h-3" viewBox="0 0 12 12">
          <use href="#icon_sprite_plus_circle_fill" />
        </svg>
        <CollapseText isCollapsed={isCollapsed}>Add account</CollapseText>{" "}
      </button>
    )
  );
};
