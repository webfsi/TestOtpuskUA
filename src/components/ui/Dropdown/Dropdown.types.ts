import { ReactNode } from "react";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  imageUrl?: string;
  type?: "country" | "city" | "hotel";
}

export interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (item: DropdownItem) => void;
  items: DropdownItem[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  emptyText?: string;
  className?: string;
}
