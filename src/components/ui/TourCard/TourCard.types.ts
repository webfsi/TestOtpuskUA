import { ReactNode } from "react";

export interface ServiceItem {
  icon: ReactNode;
  label: string;
}

export interface TourCardLabels {
  descriptionLabel?: string;
  servicesLabel?: string;
  startDateLabel?: string;
  linkLabel?: string;
  buttonLabel?: string;
}

export interface TourCardProps {
  hotelName: string;
  hotelImage: string;
  cityName: string;
  countryName: string;
  countryFlag?: string;
  startDate: string;
  price: number;
  currency: string;
  priceId?: string;
  hotelId?: string;
  className?: string;
  variant?: "default" | "detailed";
  description?: string;
  services?: ServiceItem[];
  showLink?: boolean;
  labels?: TourCardLabels;
}

