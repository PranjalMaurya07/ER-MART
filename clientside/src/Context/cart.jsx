import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);
  
  // Set axios authorization header whenever the token changes

//   useEffect(() => {
//     if (auth?.token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }, [auth.token]);

//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parseData = JSON.parse(data);
//       setAuth({
//         user: parseData?.user,
//         token: parseData?.token,
//       });
//     }
//   }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
