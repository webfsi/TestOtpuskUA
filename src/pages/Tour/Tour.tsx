import { useParams, Link } from "react-router-dom";
import { useTourData } from "../../hooks";
import { formatDate } from "../../utils";
import { Loader } from "../../components/ui/Loader";
import { Message } from "../../components/ui/Message";
import { ServiceBadge } from "../../components/ui/ServiceBadge";
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
      <div className="tour">
        <div className="tour__loader">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tour">
        <Message variant="error">{error}</Message>
        <Link to="/" className="tour__back">
          Повернутись до пошуку
        </Link>
      </div>
    );
  }

  if (!price || !hotel) {
    return (
      <div className="tour">
        <Message variant="warning">Дані не знайдено</Message>
        <Link to="/" className="tour__back">
          Повернутись до пошуку
        </Link>
      </div>
    );
  }

  const activeServices = Object.entries(hotel.services || {}).filter(
    ([, value]) => value === "yes"
  );

  return (
    <div className="tour">
      <Link to="/" className="tour__back">
        ← Назад до пошуку
      </Link>

      <div className="tour__content">
        <div className="tour__image-wrapper">
          <img src={hotel.img} alt={hotel.name} className="tour__image" />
        </div>

        <div className="tour__info">
          <h1 className="tour__title">{hotel.name}</h1>
          <p className="tour__location">
            {hotel.cityName}, {hotel.countryName}
          </p>

          {hotel.description && (
            <p className="tour__description">{hotel.description}</p>
          )}

          {activeServices.length > 0 && (
            <div className="tour__services">
              <h3 className="tour__services-title">Послуги</h3>
              <div className="tour__services-list">
                {activeServices.map(([key]) => (
                  <ServiceBadge
                    key={key}
                    icon={serviceIcons[key]}
                    label={serviceLabels[key] || key}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="tour__price-block">
            <div className="tour__dates">
              <span className="tour__date-label">Дата виїзду:</span>
              <span className="tour__date-value">
                {formatDate(price.startDate)}
              </span>
            </div>
            <div className="tour__price">
              <span className="tour__price-value">
                {price.amount.toLocaleString("uk-UA")}
              </span>
              <span className="tour__price-currency">{price.currency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;

