import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  children: ReactNode;
  to?: string;
}

export const Button: FC<ButtonProps> = ({
  size = "md",
  variant = "primary",
  children,
  className = "",
  disabled,
  to,
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

  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
