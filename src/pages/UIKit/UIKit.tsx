import { useState, useEffect } from "react";
import { Input } from "../../components/ui/Input";
import { Dropdown, DropdownItem } from "../../components/ui/Dropdown";
import "./UIKit.scss";

const mockCountries: DropdownItem[] = [
  { id: "1", label: "Польша" },
  { id: "2", label: "Чехія" },
  { id: "3", label: "Греція" },
  { id: "4", label: "Франція" },
  { id: "5", label: "Німетчина" },
  { id: "6", label: "Швейцарія" },
  { id: "7", label: "Швеція" },
  { id: "8", label: "іспанія" },
];

function UIKit() {
  const [inputValue, setInputValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(
    null
  );

  const filteredCountries = mockCountries.filter((country) =>
    country.label.includes(dropdownValue)
  );

  useEffect(() => {
    console.log("drpdwn-start:", selectedCountry);
    console.log("drpdwn-start2:", filteredCountries);
  }, [selectedCountry, filteredCountries]);

  const handleCountrySelect = (item: DropdownItem) => {
    setSelectedCountry(item);
    console.log("drpdwn:", item);
  };

  return (
    <div className="ui-kit">
      <h1>UI Kit</h1>
      <p className="ui-kit__description">
        Сторінка для перегляду UI компонентів
      </p>

      <section className="ui-kit__section">
        <h2>Dropdown</h2>
        <div className="ui-kit__dropdown-demo">
          <Dropdown
            label="Виберіть країну"
            placeholder="Введіть назву країни..."
            value={dropdownValue}
            onChange={setDropdownValue}
            onSelect={handleCountrySelect}
            items={filteredCountries}
            emptyText="Країну не знайдено"
          />
          {selectedCountry && (
            <p className="ui-kit__selected">
              Вибрано: <strong>{selectedCountry.label}</strong> (id:{" "}
              {selectedCountry.id})
            </p>
          )}
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>Input</h2>
        <div className="ui-kit__inputs">
          <Input
            label="Default"
            placeholder="Введіть текст..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input label="Small" placeholder="Small input" size="sm" />
          <Input label="Large" placeholder="Large input" size="lg" />
          <Input label="Disabled" placeholder="Disabled input" disabled />
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>Типографіка</h2>
        <h1>Заголовок H1</h1>
        <h2>Заголовок H2</h2>
        <h3>Заголовок H3</h3>
        <h4>Заголовок H4</h4>
        <p>Звичайний текст параграфа. Lorem ipsum dolor sit amet.</p>
      </section>

      <section className="ui-kit__section">
        <h2>Кольори</h2>
        <div className="ui-kit__colors">
          <div className="ui-kit__color ui-kit__color--primary">Primary</div>
          <div className="ui-kit__color ui-kit__color--success">Success</div>
          <div className="ui-kit__color ui-kit__color--warning">Warning</div>
          <div className="ui-kit__color ui-kit__color--error">Error</div>
          <div className="ui-kit__color ui-kit__color--info">Info</div>
        </div>
      </section>
    </div>
  );
}

export default UIKit;
