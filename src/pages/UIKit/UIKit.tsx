import './UIKit.scss';

function UIKit() {
  return (
    <div className="ui-kit">
      <h1>UI Kit</h1>
      <p>Сторінка для перегляду UI компонентів</p>
      
      <section className="ui-kit__section">
        <h2>Типографіка</h2>
        <h1>Заголовок H1</h1>
        <h2>Заголовок H2</h2>
        <h3>Заголовок H3</h3>
        <h4>Заголовок H4</h4>
        <p>Звичайний текст параграфа. Lorem ipsum dolor sit amet.</p>
        <p className="text-muted">Приглушений текст</p>
        <a href="#">Посилання</a>
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

      <section className="ui-kit__section">
        <h2>Компоненти</h2>
        <p>Тут будуть додаватись UI компоненти...</p>
      </section>
    </div>
  );
}

export default UIKit;

