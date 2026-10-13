"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { pageIndex, pages } from "@/lib/pages";
import { SocialLinks } from "./SocialLinks";

// Mobile / iPad bottom bar: LinkedIn + CV on the left, page switcher on the right.
// The switcher shows the current page; tapping it opens a small menu of all pages.
export function MobileBar() {
  const pathname = usePathname();
  const current = pages[pageIndex(pathname)];
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  // Close after navigating
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close on Esc or a tap outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onDown);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div className="mobile-bar">
      <SocialLinks />
      <div className="page-menu" ref={rootRef}>
        <AnimatePresence>
          {open && (
            <motion.nav
              id={menuId}
              className="page-menu-panel"
              aria-label="Pages"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul>
                {pages.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} aria-current={current.href === href ? "page" : undefined} onClick={() => setOpen(false)}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
        <button
          className="page-menu-button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`Pages — currently ${current.label}`}
          onClick={() => setOpen((o) => !o)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG */}
          <img src="/icons/menu-anchor.svg" width={12} height={16} alt="" />
          <span>{current.label}</span>
        </button>
      </div>
    </div>
  );
}
