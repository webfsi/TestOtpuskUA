import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import UIKit from "./pages/UIKit/UIKit";
import { SearchProvider } from "./context";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <SearchProvider>
        <nav
          style={{
            padding: "1rem",
            borderBottom: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
          }}
        >
          <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/ui-kit">UI Kit</Link>
            </li>
          </ul>
        </nav>
        <main style={{ padding: "0" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ui-kit" element={<UIKit />} />
          </Routes>
        </main>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
