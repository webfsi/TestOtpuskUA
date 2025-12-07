import { useParams } from "react-router-dom";
import { useTourData } from "../../hooks";
import { formatDate } from "../../utils";
import { Loader } from "../../components/ui/Loader";
import { Message } from "../../components/ui/Message";
import { TourCard } from "../../components/ui/TourCard";
import { Button } from "../../components/ui/Button";
import {
  WifiIcon,
  PoolIcon,
  TennisIcon,
  LaundryIcon,
  ParkingIcon,
} from "../../components/icons";
import "./Tour.scss";

const serviceIcons: Record<string, React.ReactNode> = {
  wifi: <WifiIcon size={16} />,
  aquapark: <PoolIcon size={16} />,
  tennis_court: <TennisIcon size={16} />,
  laundry: <LaundryIcon size={16} />,
  parking: <ParkingIcon size={16} />,
};

const serviceLabels: Record<string, string> = {
  wifi: "Wi-Fi",
  aquapark: "Басейн",
  tennis_court: "Теніс",
  laundry: "Пральня",
  parking: "Парковка",
};

function Tour() {
  const { priceId, hotelId } = useParams();
  const { isLoading, error, price, hotel } = useTourData(
    priceId || null,
    hotelId || null
  );

  if (isLoading) {
    return (
      <div className="tour-page">
        <div className="tour-page__loader">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tour-page">
        <Message variant="error">{error}</Message>
        <Button to="/" variant="secondary" size="sm">
          Повернутись до пошуку
        </Button>
      </div>
    );
  }

  if (!price || !hotel) {
    return (
      <div className="tour-page">
        <Message variant="warning">Дані не знайдено</Message>
        <Button to="/" variant="secondary" size="sm">
          Повернутись до пошуку
        </Button>
      </div>
    );
  }

  const activeServices = Object.entries(hotel.services || {})
    .filter(([, value]) => value === "yes")
    .map(([key]) => ({
      icon: serviceIcons[key],
      label: serviceLabels[key] || key,
    }));

  return (
    <div className="container container--gap">
      <TourCard
        variant="detailed"
        hotelName={hotel.name}
        hotelImage={hotel.img}
        cityName={hotel.cityName}
        countryName={hotel.countryName}
        countryFlag={hotel.countryFlag}
        startDate={formatDate(price.startDate)}
        price={price.amount}
        currency={price.currency}
        description={hotel.description}
        services={activeServices}
        showLink={false}
      />
      <Button to="/" variant="secondary" size="sm" className="tour-page__btn">
        ← Назад до пошуку
      </Button>
    </div>
  );
}

export default Tour;
