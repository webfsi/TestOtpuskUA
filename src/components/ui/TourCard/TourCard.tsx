import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { IconText } from "../IconText/IconText";
import { Button } from "../Button";
import { CountryIcon, CityIcon } from "../../icons";
import { CalendarIcon } from "../../icons/CalendarIcon";
import "./TourCard.scss";

interface ServiceItem {
  icon: ReactNode;
  label: string;
}

interface TourCardLabels {
  descriptionLabel?: string;
  servicesLabel?: string;
  startDateLabel?: string;
  linkLabel?: string;
  buttonLabel?: string;
}

const defaultLabels: TourCardLabels = {
  descriptionLabel: "Опис",
  servicesLabel: "Послуги",
  startDateLabel: "Старт туру:",
  linkLabel: "Відкрити ціну",
  buttonLabel: "Забронювати",
};

const formatCurrency = (currency: string): string => {
  const currencyMap: Record<string, string> = {
    USD: "$",
    usd: "$",
    UAH: "грн",
    uah: "грн",
    EUR: "€",
    eur: "€",
  };
  return currencyMap[currency] || currency;
};

interface TourCardProps {
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

export const TourCard: FC<TourCardProps> = ({
  hotelName,
  hotelImage,
  cityName,
  countryName,
  countryFlag,
  startDate,
  price,
  currency,
  priceId,
  hotelId,
  className,
  variant = "default",
  description,
  services,
  showLink = true,
  labels = {},
}) => {
  const isDetailed = variant === "detailed";
  const cardClass = `tour-card ${isDetailed ? "tour-card--detailed" : ""} ${
    className || ""
  }`.trim();

  const mergedLabels = { ...defaultLabels, ...labels };
  const currencySymbol = formatCurrency(currency);

  return (
    <div className={cardClass}>
      {isDetailed && (
        <>
          <h3 className="tour-card__name">{hotelName}</h3>
          <div className="tour-card__location tour-card__location--detailed">
            <IconText
              icon={
                countryFlag ? (
                  <img src={countryFlag} alt="" className="tour-card__flag" />
                ) : (
                  <CountryIcon size={16} />
                )
              }
              text={countryName}
            />
            <IconText icon={<CityIcon size={16} />} text={cityName} />
          </div>
        </>
      )}

      <div className="tour-card__image">
        <img src={hotelImage} alt={hotelName} />
      </div>

      <div className="tour-card__content">
        {!isDetailed && (
          <>
            <h3 className="tour-card__name">{hotelName}</h3>
            <div className="tour-card__location">
              {countryFlag && (
                <img src={countryFlag} alt="" className="tour-card__flag" />
              )}
              <span>
                {countryName}, {cityName}
              </span>
            </div>
          </>
        )}

        {isDetailed && description && (
          <div className="tour-card__description">
            <h4 className="tour-card__subtitle">
              {mergedLabels.descriptionLabel}
            </h4>
            <p className="tour-card__text">{description}</p>
          </div>
        )}

        {isDetailed && services && services.length > 0 && (
          <div className="tour-card__services">
            <h4 className="tour-card__subtitle">
              {mergedLabels.servicesLabel}
            </h4>
            <div className="tour-card__services-list">
              {services.map((service, idx) => (
                <IconText
                  key={idx}
                  icon={service.icon}
                  text={service.label}
                  className="tour-card__service"
                />
              ))}
            </div>
          </div>
        )}

        <div
          className={`tour-card__date ${
            isDetailed ? "tour-card__date--detailed" : ""
          }`}
        >
          {isDetailed ? (
            <IconText icon={<CalendarIcon size={16} />} text={startDate} />
          ) : (
            <>
              <span>{mergedLabels.startDateLabel}</span> {startDate}
            </>
          )}
        </div>

        <div
          className={`tour-card__footer ${
            isDetailed ? "tour-card__footer--detailed" : ""
          }`}
        >
          <span className="tour-card__price">
            {price.toLocaleString("uk-UA")} {currencySymbol}
          </span>
          {isDetailed ? (
            <Button size="sm" disabled>
              {mergedLabels.buttonLabel}
            </Button>
          ) : (
            showLink &&
            priceId &&
            hotelId && (
              <Link
                to={`/tour/${priceId}/${hotelId}`}
                className="tour-card__link"
              >
                {mergedLabels.linkLabel}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};
