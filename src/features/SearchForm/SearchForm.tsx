import { FC, useState, useEffect, useCallback, ReactNode } from "react";
import { Dropdown, DropdownItem } from "../../components/ui/Dropdown";
import { Button } from "../../components/ui/Button";
import { CountryIcon, CityIcon, HotelIcon } from "../../components/icons";
import { getCountries, searchGeo } from "../../api";
import type { CountriesMap, GeoResponse } from "../../types";
import type { SearchFormProps } from "./SearchForm.types";
import "./SearchForm.scss";

const defaultGetIconByType = (type?: string): ReactNode => {
  switch (type) {
    case "country":
      return <CountryIcon size={16} />;
    case "city":
      return <CityIcon size={16} />;
    case "hotel":
      return <HotelIcon size={16} />;
    default:
      return null;
  }
};

export const SearchForm: FC<SearchFormProps> = ({
  title,
  placeholder = "Оберіть напрямок",
  buttonText = "Знайти",
  emptyText = "Нічого не знайдено",
  initialSelected,
  onSubmit,
  getIconByType = defaultGetIconByType,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(initialSelected?.label || "");
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(
    initialSelected || null
  );
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [countries, setCountries] = useState<DropdownItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const loadCountries = useCallback(async () => {
    const response = await getCountries();
    const data: CountriesMap = await (response as Response).json();
    const countryItems: DropdownItem[] = Object.values(data).map((country) => ({
      id: country.id,
      label: country.name,
      type: "country" as const,
      imageUrl: country.flag,
      icon: !country.flag ? getIconByType("country") : undefined,
    }));
    setCountries(countryItems);
  }, [getIconByType]);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  useEffect(() => {
    if (initialSelected) {
      setInputValue(initialSelected.label);
      setSelectedItem(initialSelected);
    }
  }, [initialSelected]);

  useEffect(() => {
    if (selectedItem && inputValue !== selectedItem.label) {
      setSelectedItem(null);
    }
  }, [inputValue, selectedItem]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        return;
      }
      const response = await searchGeo(query);
      const data: GeoResponse = await (response as Response).json();
      const geoItems: DropdownItem[] = Object.values(data).map((entity) => {
        const imageUrl =
          entity.type === "country" && "flag" in entity
            ? entity.flag
            : undefined;
        return {
          id: String(entity.id),
          label: entity.name,
          type: entity.type,
          imageUrl,
          icon: !imageUrl ? getIconByType(entity.type) : undefined,
        };
      });
      setItems(geoItems);
    },
    [getIconByType]
  );

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
    if (isOpen) {
      if (!inputValue.trim()) {
        setItems(countries);
      } else if (selectedItem?.type === "country") {
        setItems(countries);
      } else if (inputValue.trim()) {
        handleSearch(inputValue);
      }
    }
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      onSubmit?.(selectedItem);
    }
  };

  const formClasses = ["search-form", className].filter(Boolean).join(" ");

  return (
    <form className={formClasses} onSubmit={handleSubmit}>
      {title && <h1 className="search-form__title">{title}</h1>}
      <div className="search-form__content">
        <div className="search-form__field">
          <Dropdown
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onSelect={handleSelect}
            items={items}
            isOpen={isDropdownOpen}
            onOpenChange={handleOpenChange}
            emptyText={emptyText}
          />
        </div>
        <Button type="submit" size="md" disabled={!selectedItem}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
};
