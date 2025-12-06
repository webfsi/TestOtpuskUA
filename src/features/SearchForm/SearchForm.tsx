import { FC, useState } from "react";
import { Dropdown, DropdownItem } from "../../components/ui/Dropdown";
import { Button } from "../../components/ui/Button";
import "./SearchForm.scss";

const mockCountries: DropdownItem[] = [
  { id: "1", label: "Єгипет" },
  { id: "2", label: "Туреччина" },
  { id: "3", label: "Греція" },
  { id: "4", label: "Іспанія" },
  { id: "5", label: "Італія" },
  { id: "6", label: "Хорватія" },
  { id: "7", label: "Чорногорія" },
  { id: "8", label: "Болгарія" },
];

export const SearchForm: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(
    null
  );

  const filteredCountries = mockCountries.filter((country) =>
    country.label.includes(inputValue)
  );

  const handleSelect = (item: DropdownItem) => {
    setSelectedCountry(item);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCountry) {
      console.log("Search:", selectedCountry);
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
            onChange={setInputValue}
            onSelect={handleSelect}
            items={filteredCountries}
            emptyText="Країну не знайдено"
          />
        </div>
        <Button type="submit" size="md" disabled={!selectedCountry}>
          Знайти
        </Button>
      </div>
    </form>
  );
};
