import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  FC,
  ReactNode,
} from "react";
import { useSearchPrices, useHotels } from "../hooks";
import { DropdownItem } from "../components/ui/Dropdown";
import { Price, Hotel } from "../types";

interface SearchContextValue {
  isLoading: boolean;
  error: string | null;
  prices: Record<string, Price> | null;
  hotels: Record<string, Hotel> | null;
  selectedCountry: DropdownItem | null;
  search: (item: DropdownItem) => void;
  abort: () => void;
  isEmpty: boolean;
  hasData: boolean;
}

const SearchContext = createContext<SearchContextValue | null>(null);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const {
    isLoading,
    error,
    data: prices,
    search: searchPrices,
    abort,
  } = useSearchPrices();
  const { data: hotels, fetch: fetchHotels } = useHotels();
  const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(
    null
  );

  useEffect(() => {
    return () => {
      abort();
    };
  }, [abort]);

  useEffect(() => {
    if (prices && selectedCountry) {
      fetchHotels(selectedCountry.id);
    }
  }, [prices, selectedCountry, fetchHotels]);

  const search = useCallback(
    (item: DropdownItem) => {
      if (item.type === "country") {
        setSelectedCountry(item);
        searchPrices(item.id);
      }
    },
    [searchPrices]
  );

  const isEmpty = Boolean(prices && Object.keys(prices).length === 0);
  const hasData = Boolean(prices && Object.keys(prices).length > 0 && hotels);

  const value: SearchContextValue = {
    isLoading,
    error,
    prices,
    hotels,
    selectedCountry,
    search,
    abort,
    isEmpty,
    hasData,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextValue => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
};

