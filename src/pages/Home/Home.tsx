import { SearchForm } from "../../features/SearchForm";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <SearchForm title="Форма пошуку турів" />
    </div>
  );
}

export default Home;
