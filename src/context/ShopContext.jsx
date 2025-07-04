import { createContext } from "react";
import { products } from "../data/data.js";

export const ShopDataContext = createContext(null);

const store = {
  products,
};

export default function ShopDataProvider({ children }) {
  return (
    <ShopDataContext.Provider value={store}>
      {children}
    </ShopDataContext.Provider>
  );
}
