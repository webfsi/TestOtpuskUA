import {
  WifiIcon,
  PoolIcon,
  TennisIcon,
  LaundryIcon,
  ParkingIcon,
} from "../components/icons";

export const serviceIcons: Record<string, React.ReactNode> = {
  wifi: <WifiIcon size={16} />,
  aquapark: <PoolIcon size={16} />,
  tennis_court: <TennisIcon size={16} />,
  laundry: <LaundryIcon size={16} />,
  parking: <ParkingIcon size={16} />,
};

export const serviceLabels: Record<string, string> = {
  wifi: "Wi-Fi",
  aquapark: "Басейн",
  tennis_court: "Теніс",
  laundry: "Пральня",
  parking: "Парковка",
};

