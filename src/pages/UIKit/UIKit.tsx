import { useState } from "react";
import { Input } from "../../components/ui/Input";
import "./UIKit.scss";

function UIKit() {
  const [inputValue, setInputValue] = useState("");
  // console.log(inputValue);
  return (
    <div className="ui-kit">
      <h1>UI Kit</h1>
      <p className="ui-kit__description">
        Сторінка для перегляду UI компонентів
      </p>

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
