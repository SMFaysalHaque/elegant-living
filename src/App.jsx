import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Product from "./pages/product";

export default function App() {
  return (
    <div className="">
      <BrowserRouter>
        <nav className="">
          <div className="">
            <Navbar />
          </div>
        </nav>
        <main className="">
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<Product />} />
            </Routes>
          </div>
        </main>
        <footer className="">
          <div className="">
            <Footer />
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}
