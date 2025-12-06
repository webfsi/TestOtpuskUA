import { SearchForm } from "../../features/SearchForm";
import { SearchResults } from "../../features/SearchResults";
import { TourCard } from "../../components/ui/TourCard";
import { formatDate } from "../../utils";
import { useSearch } from "../../context";
import "./Home.scss";

function Home() {
  const {
    isLoading,
    error,
    prices,
    hotels,
    selectedCountry,
    search,
    isEmpty,
    hasData,
  } = useSearch();

  const tourCards = hasData
    ? Object.values(prices!).map((price) => {
        const hotel = hotels![price.hotelID];
        if (!hotel) return null;

        return (
          <TourCard
            key={price.id}
            hotelName={hotel.name}
            hotelImage={hotel.img}
            cityName={hotel.cityName}
            countryName={hotel.countryName}
            countryFlag={selectedCountry?.imageUrl}
            startDate={formatDate(price.startDate)}
            price={price.amount}
            currency={price.currency === "usd" ? "$" : "грн"}
            priceId={price.id}
          />
        );
      })
    : null;

  return (
    <div className="container container--gap">
      <SearchForm title="Форма пошуку турів" onSubmit={search} />
      <SearchResults
        isLoading={isLoading}
        error={error}
        isEmpty={isEmpty}
        emptyText="За вашим запитом турів не знайдено"
      >
        {tourCards && <div className="cards">{tourCards}</div>}
      </SearchResults>
    </div>
  );
}

export default Home;
