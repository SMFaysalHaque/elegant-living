import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Product from "./pages/product";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <BrowserRouter>
        <nav className="bg-white/90 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-40">
          <Navbar />
        </nav>
        <main className="container mx-auto px-4 py-8 xl:mb-20 mb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<Product />} />
          </Routes>
        </main>
        <footer className="bg-yellow-700">
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}
