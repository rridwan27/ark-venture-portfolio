"use client";
import { LucideIcon } from "lucide-react";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  className?: string;
}

export function Button({ children, onClick, icon: Icon, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        `flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 ${className || ""}`
      }
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}
