import type { IconProps } from "./icon.type";

export const TennisIcon = ({ size = 24, color = "currentColor", ...props }: IconProps) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M4.93 4.93c4.08 4.08 10.06 4.08 14.14 0" />
    <path d="M4.93 19.07c4.08-4.08 10.06-4.08 14.14 0" />
    <path d="M12 2v20" />
  </svg>
);

