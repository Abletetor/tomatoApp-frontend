/* eslint-disable react/prop-types */
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {
   const navigate = useNavigate();
   const [menu, setMenu] = useState("home");
   const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
   const [searchTerm, setSearchTerm] = useState("");
   const [showSearch, setShowSearch] = useState(false);

   // Logout Function
   const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
   };

   // Handle Search Submission
   const handleSearch = (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
         navigate(`/search?query=${searchTerm}`);
         setShowSearch(false);
      }
   };

   return (
      <div className="navbar">
         <Link to="/">
            <img src={ assets.logo } alt="logo" className="logo" />
         </Link>
         <ul className="navbar-menu">
            <Link to="/" onClick={ () => setMenu("home") } className={ menu === "home" ? "active" : "" }>
               home
            </Link>
            <a href="#explore-menu" onClick={ () => setMenu("menu") } className={ menu === "menu" ? "active" : "" }>
               menu
            </a>
            <a href="#app-download" onClick={ () => setMenu("mobile-app") } className={ menu === "mobile-app" ? "active" : "" }>
               mobile-app
            </a>
            <a href="#footer" onClick={ () => setMenu("contact-us") } className={ menu === "contact-us" ? "active" : "" }>
               contact-us
            </a>
         </ul>

         <div className="navbar-right">
            {/* Search Icon */ }
            <div className="navbar-search-icon" onClick={ () => setShowSearch(!showSearch) }>
               <img src={ assets.search_icon } alt="Search" />
            </div>

            {/* Search Input Field */ }
            { showSearch && (
               <form className="navbar-search-bar" onSubmit={ handleSearch }>
                  <input
                     type="text"
                     placeholder="Search..."
                     value={ searchTerm }
                     onChange={ (e) => setSearchTerm(e.target.value) }
                     autoFocus
                  />
                  <button type="submit">Go</button>
               </form>
            ) }

            {/* Cart Icon */ }
            <div className="navbar-cart-icon">
               <Link to="/cart">
                  <img src={ assets.basket_icon } alt="Cart" />
               </Link>
               <div className={ getTotalCartAmount() === 0 ? "" : "dot" }></div>
            </div>

            {/* Profile Dropdown */ }
            { token ? (
               <div className="navbar-profile">
                  <img src={ assets.profile_icon } alt="Profile" />
                  <ul className="navbar-profile-dropdown">
                     <li onClick={ () => navigate("/myorders") }>
                        <img src={ assets.bag_icon } alt="Orders" />
                        <p>Orders</p>
                     </li>
                     <hr />
                     <li onClick={ logout }>
                        <img src={ assets.logout_icon } alt="Logout" />
                        <p>Logout</p>
                     </li>
                  </ul>
               </div>
            ) : (
               <button onClick={ () => setShowLogin(true) }>sign in</button>
            ) }
         </div>
      </div>
   );
};

export default Navbar;
