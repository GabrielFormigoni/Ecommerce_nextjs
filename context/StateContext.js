import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItens, setCartItens] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItens.find(
      (item) => item._id === product._id
    );

    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    if (checkProductInCart) {
      const updateCartItens = cartItens.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItens(updateCartItens);
    } else {
      product.quantity = quantity;

      setCartItens([...cartItens, { ...product }]);
    }
    toast.success(`${quantity} ${product.name} added to the cart!`);
  };

  const onRemove = (product) => {
    foundProduct = cartItens.find((item) => item._id === product._id);
    const newCartItens = cartItens.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItens(newCartItens);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItens.find((item) => item._id === id);
    index = cartItens.findIndex((item) => item._id === id);

    if (value === "inc") {
      setCartItens((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: foundProduct.quantity + 1 };
          }
          return item;
        })
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItens((prevCartItems) =>
          prevCartItems.map((item) => {
            if (item._id === id) {
              return { ...item, quantity: foundProduct.quantity - 1 };
            }
            return item;
          })
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItens,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
