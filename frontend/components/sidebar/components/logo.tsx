import { CollapseText } from "@/components/common/collapseText";

interface LogoProps {
  isCollapsed: boolean;
}

export const Logo = ({ isCollapsed }: LogoProps) => {
  return (
    <button
      type="button"
      className={` rounded-2xl text-white flex justify-center bg-[#1c1f58] hover:bg-[#2a2f6f] transition-colors px-3 py-2 my-2 ${
        isCollapsed ? "justify-center" : "justify-start"
      }`}
    >
      <svg className="w-6 h-6 flex-shrink-0 fill-current text-white">
        <use href={`/icons/icons.svg/#logo-f`} />
      </svg>

      <CollapseText
        isCollapsed={isCollapsed}
        className="ml-2 text-left flex flex-col"
      >
        <span className="font-bold text-sm">Pardons plan</span>
        <span className="text-xs text-gray-300 truncate">
          shinkosks@gmail.com
        </span>
      </CollapseText>

      <svg
        className={`w-4 h-4 ml-auto transition-transform ${isCollapsed ? "hidden" : ""}`}
        viewBox="0 0 12 12"
        fill="currentColor"
      ></svg>
    </button>
  );
};
