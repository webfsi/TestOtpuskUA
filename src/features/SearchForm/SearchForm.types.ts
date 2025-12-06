import { DropdownItem } from "../../components/ui/Dropdown";
import type { ReactNode } from "react";

export type SelectedCountry = DropdownItem | null;

export interface SearchFormProps {
  title?: string;
  placeholder?: string;
  buttonText?: string;
  emptyText?: string;
  onSubmit?: (item: DropdownItem) => void;
  getIconByType?: (type?: string) => ReactNode;
  className?: string;
}
