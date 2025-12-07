import { FC, ReactNode } from "react";
import "./IconText.scss";

interface IconTextProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

export const IconText: FC<IconTextProps> = ({ icon, text, className }) => {
  return (
    <span className={`icon-text ${className || ""}`}>
      <span className="icon-text__icon">{icon}</span>
      <span className="icon-text__text">{text}</span>
    </span>
  );
};

