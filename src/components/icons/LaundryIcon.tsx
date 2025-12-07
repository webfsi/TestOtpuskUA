import type { IconProps } from "./icon.type";

export const LaundryIcon = ({ size = 24, color = "currentColor", ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="2" width="18" height="20" rx="2" />
    <circle cx="12" cy="13" r="5" />
    <path d="M12 8v1" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
  </svg>
);

