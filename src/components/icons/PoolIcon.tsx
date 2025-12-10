import type { IconProps } from "./icon.type";

export const PoolIcon = ({ size = 24, color = "currentColor", ...props }: IconProps) => (
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
    <path d="M2 12h20" />
    <path d="M2 16c1-1 2-2 4-2s3 1 4 2 2 2 4 2 3-1 4-2 2-2 4-2" />
    <path d="M2 20c1-1 2-2 4-2s3 1 4 2 2 2 4 2 3-1 4-2 2-2 4-2" />
    <path d="M9 8V4" />
    <path d="M15 8V4" />
    <path d="M6 8h12" />
  </svg>
);

