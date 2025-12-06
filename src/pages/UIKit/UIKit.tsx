import { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Dropdown, DropdownItem } from "../../components/ui/Dropdown";
import "./UIKit.scss";

const mockCountries: DropdownItem[] = [
  { id: "1", label: "Єгипет" },
  { id: "2", label: "Туреччина" },
  { id: "3", label: "Греція" },
  { id: "4", label: "Іспанія" },
  { id: "5", label: "Італія" },
];

function UIKit() {
  const [inputValue, setInputValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<DropdownItem | null>(
    null
  );

  const filteredCountries = mockCountries.filter((country) =>
    country.label.toLowerCase().includes(dropdownValue.toLowerCase())
  );

  const handleCountrySelect = (item: DropdownItem) => {
    setSelectedCountry(item);
  };

  return (
    <div className="ui-kit">
      <h1>UI Kit</h1>
      <p className="ui-kit__description">
        Сторінка для перегляду UI компонентів
      </p>

      <section className="ui-kit__section">
        <h2>Button</h2>
        <div className="ui-kit__buttons">
          <div className="ui-kit__button-row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="ui-kit__button-row">
            <Button variant="secondary" size="sm">Secondary SM</Button>
            <Button variant="secondary" size="md">Secondary MD</Button>
            <Button variant="secondary" size="lg">Secondary LG</Button>
          </div>
          <div className="ui-kit__button-row">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
          </div>
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>Input + Button (однакова висота)</h2>
        <div className="ui-kit__input-button">
          <Input placeholder="Small input" size="sm" />
          <Button size="sm">SM</Button>
        </div>
        <div className="ui-kit__input-button">
          <Input placeholder="Medium input" size="md" />
          <Button size="md">MD</Button>
        </div>
        <div className="ui-kit__input-button">
          <Input placeholder="Large input" size="lg" />
          <Button size="lg">LG</Button>
        </div>
      </section>

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
