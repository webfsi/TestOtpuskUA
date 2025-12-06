import { FC } from "react";
import "./TourCard.scss";

interface TourCardProps {
  hotelName: string;
  hotelImage: string;
  cityName: string;
  countryName: string;
  countryFlag?: string;
  startDate: string;
  price: number;
  currency: string;
  priceId: string;
  className?: string;
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
  className,
}) => {
  return (
    <div className={`tour-card ${className || ""}`}>
      <div className="tour-card__image">
        <img src={hotelImage} alt={hotelName} />
      </div>
      <div className="tour-card__content">
        <h3 className="tour-card__name">{hotelName}</h3>
        <div className="tour-card__location">
          {countryFlag && <img src={countryFlag} alt="" className="tour-card__flag" />}
          <span>{countryName}, {cityName}</span>
        </div>
        <div className="tour-card__date">
          <span>Старт туру:</span> {startDate}
        </div>
        <div className="tour-card__footer">
          <span className="tour-card__price">{price} {currency}</span>
          <a href={`/tour/${priceId}`} className="tour-card__link">Відкрити ціну</a>
        </div>
      </div>
    </div>
  );
};

