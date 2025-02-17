import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Verify from "./pages/Verify/Verify";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import MyOrders from "./pages/MyOrders/MyOrders";
import SearchResults from "./pages/SearchResult/SearchResults";


const App = () => {
   const [showLogin, setShowLogin] = useState(false);

   return (
      <>
         <ToastContainer />
         { showLogin ? <LoginPopup setShowLogin={ setShowLogin } /> : <></> }
         <Navbar setShowLogin={ setShowLogin } />
         <div className="app">
            <Routes>
               <Route path="/" element={ <Home /> } />
               <Route path="/cart" element={ <Cart /> } />
               <Route path="/order" element={ <PlaceOrder /> } />
               <Route path="/verify" element={ <Verify /> } />
               <Route path="/myorders" element={ <MyOrders /> } />
               <Route path="/search" element={ <SearchResults /> } />
            </Routes>
         </div>
         <Footer />
      </>
   );
};

export default App;
