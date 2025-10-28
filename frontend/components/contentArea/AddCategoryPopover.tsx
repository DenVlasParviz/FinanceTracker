// components/AddCategoryPopover.tsx
"use client";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../hooks/useClickOutside";

type Props = {
  onCreate?: (name: string) => Promise<void> | void;
  buttonClassName?: string;
  buttonChildren?: React.ReactNode;
  panelWidth?: number;
};

export const AddCategoryPopover: React.FC<Props> = ({
                                                      onCreate,
                                                      buttonClassName,
                                                      buttonChildren,
                                                      panelWidth = 288,
                                                    }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [pos, setPos] = useState<{ top: number; left: number; arrowLeft: number } | null>(null);

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(panelRef, () => {
    if (open) close();
  });

  const calculatePos = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return setPos(null);
    const rect = btn.getBoundingClientRect();

    // panel top: under the button
    const gap = 8;
    const top = rect.bottom + gap + window.scrollY;

    // centered left relative to button center
    const centeredLeft = rect.left + window.scrollX + rect.width / 2 - panelWidth / 2;

    // clamp left to keep inside viewport
    const left = Math.max(8 + window.scrollX, Math.min(centeredLeft, window.scrollX + window.innerWidth - panelWidth - 8));

    // arrow position relative to panel left
    const buttonCenterX = rect.left + window.scrollX + rect.width / 2;
    const arrowLeft = Math.max(12, Math.min(buttonCenterX - left, panelWidth - 12)); // keep arrow away from edges

    setPos({ top, left, arrowLeft });
  }, [panelWidth]);


  useLayoutEffect(() => {
    if (!open) return;
    calculatePos();
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [open, calculatePos]);

  useEffect(() => {
    if (!open) return;
    const onChange = () => calculatePos();
    window.addEventListener("resize", onChange);
    window.addEventListener("scroll", onChange, true);
    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange, true);
    };
  }, [open, calculatePos]);

  const toggle = () => setOpen((s) => !s);

  const handleOk = async () => {
    if (!value.trim()) {
      inputRef.current?.focus();
      return;
    }
    if (onCreate) await onCreate(value.trim());
    setValue("");
    setOpen(false);
  };

  const handleCancel = () => {
    setValue("");
    setOpen(false);
  };

  // panel portal
  const panel = open && pos
    ? createPortal(
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        style={{
          position: "absolute",
          top: pos.top,
          left: pos.left,
          width: panelWidth,
          zIndex: 9999,
        }}
      >
        <div className="relative bg-white border border-gray-200 rounded-md shadow-[0_16px_64px_rgba(0,0,0,0.2)]">
          <div className="p-3">
            <div className="mb-2 text-sm font-medium text-gray-700">New Category Group</div>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="New Category Group"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-300 text-black"
            />
          </div>

          <div className="flex justify-end gap-2 p-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-md bg-gray-50 hover:bg-gray-100 text-sm"
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

          {/* arrow*/}
          <div
            style={{ left: pos.arrowLeft }}
            className="absolute -top-2 w-6 h-3 -translate-x-1/2 pointer-events-none"
            aria-hidden
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M 0 100 L 50 0 L 100 100 Z" fill="white" />
            </svg>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute top-0 left-0">
              <path d="M 0 100 L 50 0 L 100 100 Z" fill="rgba(0,0,0,0.06)" transform="translate(0,2)"/>
            </svg>
          </div>
        </div>
      </div>,
      document.body
    )
    : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
        className={buttonClassName ?? "inline-flex items-center justify-center p-1 rounded hover:bg-gray-100"}
      >
        {buttonChildren ?? (
          <>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 1a.75.75 0 0 1 .75.75V7h5.25a.75.75 0 0 1 0 1.5H8.75v5.25a.75.75 0 0 1-1.5 0V8.5H2a.75.75 0 0 1 0-1.5h5.25V1.75A.75.75 0 0 1 8 1z"/>
            </svg>
            <span className="text-sm text-gray-700">Category Group</span>
          </>
        )}
      </button>

      {panel}
    </>
  );
};
