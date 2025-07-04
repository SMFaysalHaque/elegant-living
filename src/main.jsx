import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ShopDataProvider from "./context/ShopContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopDataProvider>
      <App />
    </ShopDataProvider>
  </StrictMode>
);
