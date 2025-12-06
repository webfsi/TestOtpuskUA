import { FC, useState, useEffect, useCallback } from "react";
import { Dropdown, DropdownItem } from "../../components/ui/Dropdown";
import { Button } from "../../components/ui/Button";
import { getCountries, searchGeo } from "../../api";
import type { CountriesMap, GeoResponse } from "../../types";
import "./SearchForm.scss";

export const SearchForm: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [countries, setCountries] = useState<DropdownItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const loadCountries = useCallback(async () => {
    const response = await getCountries();
    const data: CountriesMap = await response.json();
    const countryItems: DropdownItem[] = Object.values(data).map((country) => ({
      id: country.id,
      label: country.name,
      type: "country" as const,
    }));
    setCountries(countryItems);
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  useEffect(() => {
    if (selectedItem && inputValue !== selectedItem.label) {
      setSelectedItem(null);
    }
  }, [inputValue, selectedItem]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      return;
    }
    const response = await searchGeo(query);
    const data: GeoResponse = await response.json();
    const geoItems: DropdownItem[] = Object.values(data).map((entity) => ({
      id: String(entity.id),
      label: entity.name,
      type: entity.type,
    }));
    setItems(geoItems);
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim()) {
      handleSearch(value);
    } else {
      setItems(countries);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
    if (isOpen && !inputValue.trim()) {
      setItems(countries);
    }
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      console.log("Search:", selectedItem);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h1 className="search-form__title">Форма пошуку турів</h1>
      <div className="search-form__content">
        <div className="search-form__field">
          <Dropdown
            placeholder="Оберіть напрямок"
            value={inputValue}
            onChange={handleInputChange}
            onSelect={handleSelect}
            items={items}
            isOpen={isDropdownOpen}
            onOpenChange={handleOpenChange}
            emptyText="Нічого не знайдено"
          />
        </div>
        <Button type="submit" size="md" disabled={!selectedItem}>
          Знайти
        </Button>
      </div>
    </form>
  );
};
