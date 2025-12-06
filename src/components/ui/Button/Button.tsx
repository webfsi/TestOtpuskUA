import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  size = "md",
  variant = "primary",
  children,
  className = "",
  disabled,
  ...rest
}) => {
  const buttonClasses = [
    "button",
    `button--${size}`,
    `button--${variant}`,
    disabled && "button--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

