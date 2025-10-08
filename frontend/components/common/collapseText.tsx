"use client"

import React from "react";

interface CollapseTextProps {
    isCollapsed: boolean;
    children: React.ReactNode;
    className?: string;
}

export const CollapseText = ({ isCollapsed, children, className = "" }: CollapseTextProps) => {
    return (
        <span
            className={`
        inline-block overflow-hidden whitespace-nowrap align-middle
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
        ${className}
      `}
        >
      {children}
    </span>
    );
};
