/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

   const baseUrl = import.meta.env.VITE_APP_BASE_URL;
   const [cartItems, setCartItems] = useState({});
   const [token, setToken] = useState("");
   const [food_list, setFoodList] = useState([]);

   //Add Item to Cart
   const addToCart = async (itemId) => {
      const userId = localStorage.getItem("userId");

      if (!userId || userId === "undefined") {
         toast.error("Please log in to add items to the cart.");
         return;
      }

      try {
         const response = await axios.post(
            `${baseUrl}/api/cart/add`,
            { userId, itemId },
            { headers: { "Content-Type": "application/json", token } }
         );

         if (response.data.success) {
            setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
         }
      } catch (error) {
         console.error("Error adding to cart:", error);
      }
   };

   // Remove Item from Cart
   const removeFromCart = async (itemId) => {
      const userId = localStorage.getItem("userId");
      if (!cartItems[itemId]) return;

      // Update UI immediately for a smooth experience
      setCartItems((prev) => {
         const updatedCart = { ...prev };
         updatedCart[itemId] -= 1;
         if (updatedCart[itemId] <= 0) {
            delete updatedCart[itemId];
         }
         return updatedCart;
      });

      // Send request to backend
      if (token) {
         try {
            await axios.post(baseUrl + "/api/cart/remove", { userId, itemId }, { headers: { token } });
         } catch (error) {
            toast.error("Failed to remove item from cart", error);
         }
      }
   };


   //Calculate Total Amount in Cart
   const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {

         if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);
            totalAmount += itemInfo.price * cartItems[item];
         }
      }
      return totalAmount;
   };

   //Fetch Food List
   const fetchFoodList = async () => {
      try {
         const response = await axios.get(baseUrl + '/api/food/list');
         setFoodList(response.data.data);
      } catch (error) {
         console.log(error);
      }
   };

   // Load Cart Data
   const loadCartData = async (userId) => {
      if (!userId) return;

      try {
         const response = await axios.get(`${baseUrl}/api/cart/get?userId=${userId}`, { headers: { token } });
         setCartItems(response.data.cartData || {});
      } catch (error) {
         console.error("Error loading cart data:", error);
      }
   };

   // Set Token from Local Storage & Load Cart
   useEffect(() => {
      async function loadData () {
         await fetchFoodList();

         const storedToken = localStorage.getItem("token");
         const storedUserId = localStorage.getItem("userId");

         if (storedToken && storedUserId) {
            setToken(storedToken);
            await loadCartData(storedUserId);
         }
      }
      loadData();
   }, []);

   const contextValue = {
      food_list,
      cartItems, setCartItems,
      addToCart, removeFromCart,
      getTotalCartAmount,
      baseUrl,
      token, setToken,
   };
   return (
      <StoreContext.Provider value={ contextValue }>
         { props.children }
      </StoreContext.Provider>
   );
};
export default StoreContextProvider;
