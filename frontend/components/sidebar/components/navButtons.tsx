import { CollapseText } from "@/components/common/collapseText";

type NavButton = {
  id: string;
  href: string;
  label: string;
  iconId: string; // теперь указываем ID символа в icons.svg
  active?: boolean;
};

interface NavButtonsProps {
  isCollapsed: boolean;
}

export const NavButtons = ({ isCollapsed }: NavButtonsProps) => {
  const buttons: NavButton[] = [
    {
      id: "budget",
      href: "/budget/202510",
      label: "Plan",
      iconId: "money", // из /public/icons/icons.svg
    },
    {
      id: "reports",
      href: "/reflect",
      label: "Reflect",
      iconId: "bank",
    },
  ];

  return (
    <ul className="flex flex-col gap-2 mt-4">
      {buttons.map((btn) => (
        <li
          key={btn.id}
          className={`navlink navlink-${btn.id} ${btn.active ? "active" : ""}`}
        >
          <a
            href={btn.href}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
          >
            <svg className="w-6 h-6 flex-shrink-0 fill-current text-white">
              <use href={`/icons/icons.svg#${btn.iconId}`} />
            </svg>
            <CollapseText isCollapsed={isCollapsed} className="text-white">
              {btn.label}
            </CollapseText>{" "}
          </a>
        </li>
      ))}
    </ul>
  );
};
