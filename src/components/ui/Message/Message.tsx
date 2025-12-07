import { FC, ReactNode } from "react";
import "./Message.scss";

interface MessageProps {
  variant?: "error" | "info" | "warning" | "success";
  children: ReactNode;
  className?: string;
}

export const Message: FC<MessageProps> = ({
  variant = "info",
  children,
  className,
}) => {
  return (
    <div className={`message message--${variant} ${className || ""}`}>
      {children}
    </div>
  );
};

