"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "medina-theme";

function applyTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore private-mode quota */
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  function choose(next: Theme) {
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div
      role="group"
      aria-label="Color mode"
      className="inline-flex rounded-full border border-hairline p-1"
    >
      <button
        type="button"
        aria-label="Light mode"
        aria-pressed={theme === "light"}
        onClick={() => choose("light")}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
          theme === "light"
            ? "bg-ink text-white"
            : "text-ink/45 hover:text-ink"
        }`}
      >
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="Dark mode"
        aria-pressed={theme === "dark"}
        onClick={() => choose("dark")}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
          theme === "dark"
            ? "bg-ink text-white"
            : "text-ink/45 hover:text-ink"
        }`}
      >
        <Moon className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </div>
  );
}
