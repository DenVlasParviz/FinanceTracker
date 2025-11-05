"use client";
import React, { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, balance?: number) => Promise<void>;
  initial?: { id?: string; name?: string; balance?: number };
}

export const AddAccountModal = ({ open, onClose, onSave, initial }: Props) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [balance, setBalance] = useState<string>(initial?.balance?.toString() ?? "0");

  React.useEffect(() => {
    if (open) {
      setName(initial?.name ?? "");
      setBalance(initial?.balance?.toString() ?? "0");
    }
  }, [open, initial]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white p-6 rounded shadow-lg w-[420px] z-10">
        <h3 className="text-lg text-black font-semibold mb-4">{initial ? "Edit account" : "Add account"}</h3>
        <label className="text-sm text-black">Nickname</label>
        <input className="w-full p-2 border rounded mb-3" value={name} onChange={(e)=>setName(e.target.value)} />

        <label className="text-sm">Current balance</label>
        <input className="w-full p-2 border rounded mb-3" value={balance} onChange={(e)=>setBalance(e.target.value)} inputMode="decimal" />

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2" onClick={onClose}>Cancel</button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={async ()=> {
              const bal = parseFloat(balance || "0") || 0;
              await onSave(name, bal);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
