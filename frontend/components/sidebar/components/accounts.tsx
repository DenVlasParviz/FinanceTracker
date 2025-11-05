"use client";
import React, { useState } from "react";
import { CollapseText } from "@/components/common/collapseText";
import { useAccounts } from "@/components/context/accountsContext";
import { AddAccountModal } from "@/components/modals/AddAccountsModal";

export const Accounts = ({ isCollapsed }: { isCollapsed: boolean; mainAmount?: string; subAccounts?: any[] }) => {
  const { accounts, isLoading, create, update } = useAccounts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  return (
    <div className="flex flex-col w-full bg-[#1c1f58]">
      {!isCollapsed && (
        <div className="flex justify-between items-center p-2 text-gray-200 font-medium">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-white" viewBox="0 0 8 8" fill="currentColor">
              <use href="#chart" />
            </svg>

            <CollapseText isCollapsed={isCollapsed} className="font-semibold text-sm">
              ACCOUNTS
            </CollapseText>
          </div>

          <CollapseText isCollapsed={isCollapsed} className="text-sm font-semibold">
            ${accounts.reduce((s,a)=>s + (a.balance ?? 0), 0).toLocaleString()}
          </CollapseText>
        </div>
      )}

      {isLoading && <div className="p-2 text-sm text-gray-400">Loading...</div>}

      {accounts.map((acc) => (
        <div key={acc.id} className="flex justify-between items-center p-2 text-gray-300 text-sm rounded hover:bg-gray-700 transition-all">
          <div>
            <CollapseText isCollapsed={isCollapsed}>{acc.name}</CollapseText>
            {!isCollapsed && <div className="text-xs text-gray-400">{new Date(acc.updatedAt ?? "").toLocaleDateString()}</div>}
          </div>
          <div className="flex items-center gap-2">
            <CollapseText isCollapsed={isCollapsed} className="font-semibold">${acc.balance.toLocaleString()}</CollapseText>
            {!isCollapsed && (
              <button onClick={() => { setEditing(acc); setModalOpen(true); }} className="text-xs text-blue-300">Edit</button>
            )}
          </div>
        </div>
      ))}

      {/*Add accounts button from old script (AddAccountButton)*/}
      {!isCollapsed && (
        <div className="p-2">
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-[#383ca3] rounded hover:bg-blue-800 transition-colors duration-150"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12">
              <use href="#icon_sprite_plus_circle_fill" />
            </svg>
            <CollapseText isCollapsed={isCollapsed}>Add account</CollapseText>
          </button>
        </div>
      )}

      <AddAccountModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        initial={editing ? { id: editing.id, name: editing.name, balance: editing.balance } : undefined}
        onSave={async (name, balance) => {
          if (editing) {
            await update(editing.id, { name, balance });
          } else {
            await create(name, balance);
          }

        }}
      />
    </div>
  );
};
