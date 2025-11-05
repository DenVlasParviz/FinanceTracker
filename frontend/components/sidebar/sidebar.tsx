"use client";
import { Logo } from "@/components/sidebar/components/logo";
import { NavButtons } from "@/components/sidebar/components/navButtons";
import { Accounts } from "@/components/sidebar/components/accounts";
import { CollapseButton } from "@/components/sidebar/components/collapseButton";

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const Sidebar = ({ isCollapsed, toggleCollapse }: SidebarProps) => {
  return (
    <nav
      className={`bg-[#1c1f58] h-screen p-2 flex flex-col fixed left-0 top-0 transition-all duration-300 overflow-hidden ${
        isCollapsed ? "w-[52px]" : "w-[260px]"
      }`}
    >
      <Logo isCollapsed={isCollapsed} />
      <NavButtons isCollapsed={isCollapsed} />
      <Accounts

        isCollapsed={isCollapsed}
      />
      <CollapseButton
        toggleCollapse={toggleCollapse}
        isCollapsed={isCollapsed}
      />
    </nav>
  );
};
