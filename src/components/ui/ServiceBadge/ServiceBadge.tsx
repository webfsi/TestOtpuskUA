import { FC, ReactNode } from "react";
import "./ServiceBadge.scss";

interface ServiceBadgeProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export const ServiceBadge: FC<ServiceBadgeProps> = ({
  icon,
  label,
  className,
}) => {
  return (
    <div className={`service-badge ${className || ""}`}>
      <span className="service-badge__icon">{icon}</span>
      <span className="service-badge__label">{label}</span>
    </div>
  );
};

