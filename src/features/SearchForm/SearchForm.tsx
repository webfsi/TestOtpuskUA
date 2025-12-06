import { FC, useState } from "react";
import { Dropdown, DropdownItem } from "../../components/ui/Dropdown";
import { Button } from "../../components/ui/Button";
import { mockCountries } from "../../mocks";
import type { SelectedCountry } from "./SearchForm.types";
import "./SearchForm.scss";

export const SearchForm: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>(null);

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
