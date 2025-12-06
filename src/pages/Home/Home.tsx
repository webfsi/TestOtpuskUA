import { useEffect, useState } from "react";
import { SearchForm } from "../../features/SearchForm";
import { SearchResults } from "../../features/SearchResults";
import { useSearchPrices, useHotels } from "../../hooks";
import { DropdownItem } from "../../components/ui/Dropdown";
import { TourCard } from "../../components/ui/TourCard";
import { formatDate } from "../../utils";
import "./Home.scss";

function Home() {
  const { isLoading, error, data, search, abort } = useSearchPrices();
  const { data: hotels, fetch: fetchHotels } = useHotels();
  const [countryId, setCountryId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      abort();
    };
  }, [abort]);

  useEffect(() => {
    if (data && countryId) {
      fetchHotels(countryId);
    }
  }, [data, countryId, fetchHotels]);

  const handleSearch = (item: DropdownItem) => {
    if (item.type === "country") {
      setCountryId(item.id);
      search(item.id);
    }
  };

  const isEmpty = data && Object.keys(data).length === 0;
  const hasData = data && Object.keys(data).length > 0 && hotels;

  const tourCards = hasData
    ? Object.values(data).map((price) => {
        const hotel = hotels[price.hotelID];
        if (!hotel) return null;

        return (
          <TourCard
            key={price.id}
            hotelName={hotel.name}
            hotelImage={hotel.img}
            cityName={hotel.cityName}
            countryName={hotel.countryName}
            startDate={formatDate(price.startDate)}
            price={price.amount}
            currency={price.currency === "usd" ? "$" : "грн"}
            priceId={price.id}
          />
        );
      })
    : null;

  return (
    <div className="home">
      <SearchForm title="Форма пошуку турів" onSubmit={handleSearch} />

      <SearchResults
        isLoading={isLoading}
        error={error}
        isEmpty={isEmpty}
        emptyText="За вашим запитом турів не знайдено"
      >
        {tourCards && <div className="home__cards">{tourCards}</div>}
      </SearchResults>
    </div>
  );
}

export default Home;
