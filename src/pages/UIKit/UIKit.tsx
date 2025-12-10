import { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Dropdown, DropdownItem } from "../../components/ui/Dropdown";
import { Loader } from "../../components/ui/Loader";
import { Message } from "../../components/ui/Message";
import { TourCard } from "../../components/ui/TourCard";
import { IconText } from "../../components/ui/IconText";
import { SearchResults } from "../../features/SearchResults";
import {
  WifiIcon,
  PoolIcon,
  ParkingIcon,
  CalendarIcon,
} from "../../components/icons";
import "./UIKit.scss";
import { mockCountries } from "../../mocks";

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
        <h2>Loader</h2>
        <div className="ui-kit__loaders">
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>Message</h2>
        <div className="ui-kit__messages">
          <Message variant="info">Info message</Message>
          <Message variant="success">Success message</Message>
          <Message variant="warning">Warning message</Message>
          <Message variant="error">Error message</Message>
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>IconText</h2>
        <div className="ui-kit__icon-texts">
          <IconText icon={<CalendarIcon size={16} />} text="15.01.2025" />
          <IconText icon={<WifiIcon size={16} />} text="Wi-Fi" />
          <IconText icon={<PoolIcon size={16} />} text="Басейн" />
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>Button</h2>
        <div className="ui-kit__buttons">
          <div className="ui-kit__button-row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="ui-kit__button-row">
            <Button variant="secondary" size="sm">
              Secondary SM
            </Button>
            <Button variant="secondary" size="md">
              Secondary MD
            </Button>
            <Button variant="secondary" size="lg">
              Secondary LG
            </Button>
          </div>
          <div className="ui-kit__button-row">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
          </div>
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>Input + Button</h2>
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
        <h2>SearchResults</h2>
        <div className="ui-kit__search-results">
          <div>
            <h4>Loading state:</h4>
            <SearchResults isLoading />
          </div>
          <div>
            <h4>Error state:</h4>
            <SearchResults error="Помилка завантаження. Спробуйте пізніше." />
          </div>
          <div>
            <h4>Empty state:</h4>
            <SearchResults
              isEmpty
              emptyText="За вашим запитом турів не знайдено"
            />
          </div>
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>TourCard (default)</h2>
        <div className="ui-kit__tour-cards">
          <TourCard
            hotelName="Sunrise Garden Beach Resort"
            hotelImage="https://newimg.otpusk.com/2/400x300/00/03/97/88/3978846.webp"
            cityName="Хургада"
            countryName="Єгипет"
            countryFlag="https://flagcdn.com/w40/eg.png"
            startDate="15.01.2025"
            price={12345}
            currency="грн"
            priceId="price-123"
            hotelId="hotel-1"
          />
          <TourCard
            hotelName="Rixos Premium Bodrum"
            hotelImage="https://newimg.otpusk.com/2/400x300/00/03/97/88/3978846.webp"
            cityName="Бодрум"
            countryName="Туреччина"
            countryFlag="https://flagcdn.com/w40/tr.png"
            startDate="20.02.2025"
            price={45600}
            currency="грн"
            priceId="price-456"
            hotelId="hotel-2"
          />
        </div>
      </section>

      <section className="ui-kit__section">
        <h2>TourCard (detailed)</h2>
        <div className="ui-kit__tour-card-detailed">
          <TourCard
            variant="detailed"
            hotelName="Sunrise Garden Beach Resort"
            hotelImage="https://newimg.otpusk.com/2/400x300/00/03/97/88/3978846.webp"
            cityName="Хургада"
            countryName="Єгипет"
            countryFlag="https://flagcdn.com/w40/eg.png"
            startDate="15.01.2025"
            price={12345}
            currency="грн"
            description="Готель розташований на березі Червоного моря та пропонує комфортний відпочинок для всієї родини. До послуг гостей басейн, спа-центр та ресторан."
            services={[
              { icon: <WifiIcon size={16} />, label: "Wi-Fi" },
              { icon: <PoolIcon size={16} />, label: "Басейн" },
              { icon: <ParkingIcon size={16} />, label: "Парковка" },
            ]}
            showLink={false}
          />
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
