import React, { useCallback, useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { createCategory } from "@/components/api/api";
type Props = {
  onCreate?:(name:string) => Promise<void> | void;
  buttonClassName?: string;

}

export const AddCategoryPopover: React.FC<Props> = ({ onCreate, buttonClassName }) => {

  const buttonRef= useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const close = useCallback(()=> setOpen(false),[]);
  useClickOutside(panelRef,()=>{
    if(open) close();
  })

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);


  // Calculate panel pos. relative to the button



  const toggle= useCallback(()=>{
    if(!open) {
      setOpen(true);
      setTimeout(()=> inputRef.current?.focus(),0);
    }else{
      setOpen(false);
    }
  },[open]);


  const handleOk = async () => {
    if (!value.trim()) {
      inputRef.current?.focus();
      return;
    }
    await createCategory(value.trim());

    if (onCreate) await onCreate(value.trim());
    setValue("");
    setOpen(false);
  };

  const handleCancel = () => {
    setValue("");
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
        className={buttonClassName ?? "flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-lime-700 px-3 py-1.5 rounded-lg"}
      >
        {/* plus icon */}
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M8 1a.75.75 0 0 1 .75.75V7h5.25a.75.75 0 0 1 0 1.5H8.75v5.25a.75.75 0 0 1-1.5 0V8.5H2a.75.75 0 0 1 0-1.5h5.25V1.75A.75.75 0 0 1 8 1z"/>
        </svg>
        Category Group
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          className="z-50 w-72 bg-white border border-gray-200 rounded-md    shadow-[0_16px_64px_rgba(0,0,0,0.2)]"
          style={{
            position: "absolute",

          }}
        >
          <div className="p-3">
            <div className="mb-2 text-sm font-medium text-gray-700">New Category Group</div>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="New Category Group"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-lime-300"
            />
          </div>

          <div className="flex justify-end gap-2 p-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-md bg-green-700 hover:bg-green-900 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOk}
              className="px-3 py-1.5 rounded-md bg-lime-600 text-white text-sm hover:bg-lime-700"
            >
              OK
            </button>
          </div>

          {/* little arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M 0 100 L 50 0 L 100 100 L 0 100 Z" fill="black" /> {/* todo: change to white(fix white looking as grey */}
            </svg>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute top-0 left-0">
              <path d="M 0 100 L 50 0 L 100 100 L 0 100 Z" fill="rgba(0,0,0,0.06)" transform="translate(0,2)"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
