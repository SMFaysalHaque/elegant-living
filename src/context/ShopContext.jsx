import { createContext, useEffect, useState } from "react";
import { products as initialProducts } from "../data/data";

export const ShopDataContext = createContext(null);

export default function ShopDataProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : initialProducts;
  });

  const [cartList, setCartList] = useState(() => {
    const stored = localStorage.getItem("cartList");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addToCart = (productId) => {
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1 || products[productIndex].stock === 0) return;

    const inCart = cartList.find((item) => item.id === productId);
    if (inCart) {
      // Increase quantity if already in cart
      setCartList((prev) =>
        prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item to cart
      const newProduct = { ...products[productIndex] };
      setCartList([
        ...cartList,
        {
          id: newProduct.id,
          title: newProduct.title,
          subtitle: newProduct.subtitle,
          price: newProduct.price,
          image: newProduct.images[0].url,
          quantity: 1,
        },
      ]);
    }

    // Decrease stock
    updateStock(productId, -1);
  };

  const updateStock = (productId, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + delta } : p
      )
    );
  };

  const increaseQuantity = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) return;

    setCartList((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    updateStock(productId, -1);
  };

  const decreaseQuantity = (productId) => {
    const item = cartList.find((p) => p.id === productId);
    if (!item || item.quantity <= 0) return;

    if (item.quantity === 1) {
      removeFromCart(productId);
    } else {
      setCartList((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
      updateStock(productId, +1);
    }
  };

  const removeFromCart = (productId) => {
    const cartItem = cartList.find((item) => item.id === productId);
    if (!cartItem) return;

    updateStock(productId, cartItem.quantity);
    setCartList((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartList([]);
  };

  const cartCount = cartList.length;

  const cartTotal = cartList.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <ShopDataContext.Provider
      value={{
        products,
        cartList,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartTotal,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </ShopDataContext.Provider>
  );
}
