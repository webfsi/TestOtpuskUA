import { FC } from "react";
import "./Loader.scss";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ size = "md", className }) => {
  console.log("ldr");
  return (
    <div className={`loader loader--${size} ${className || ""}`}>
      <div className="loader__spinner" />
    </div>
  );
};

