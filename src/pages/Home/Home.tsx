import { useEffect } from "react";
import { SearchForm } from "../../features/SearchForm";
import { SearchResults } from "../../features/SearchResults";
import { useSearchPrices } from "../../hooks";
import { DropdownItem } from "../../components/ui/Dropdown";
import "./Home.scss";

function Home() {
  const { isLoading, error, data, search, abort } = useSearchPrices();

  useEffect(() => {
    return () => {
      abort();
    };
  }, [abort]);

  const handleSearch = (item: DropdownItem) => {
    if (item.type === "country") {
      search(item.id);
    }
  };

  const isEmpty = data && Object.keys(data).length === 0;
  const hasData = data && Object.keys(data).length > 0;

  return (
    <div className="home">
      <SearchForm title="Форма пошуку турів" onSubmit={handleSearch} />

      <SearchResults
        isLoading={isLoading}
        error={error}
        isEmpty={isEmpty}
        emptyText="За вашим запитом турів не знайдено"
      >
        {hasData && (
          <div className="home__results">
            <p>Знайдено {Object.keys(data).length} пропозицій</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </SearchResults>
    </div>
  );
}

export default Home;
