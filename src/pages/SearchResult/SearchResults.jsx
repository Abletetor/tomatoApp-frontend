import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./SearchResults.css";
import { StoreContext } from "../../context/StoreContext";

const SearchResults = () => {
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const searchQuery = queryParams.get("query");
   const { baseUrl } = useContext(StoreContext);

   const [foods, setFoods] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchSearchResults = async () => {
         if (!searchQuery) return;
         setLoading(true);
         try {
            const response = await axios.post(
               `${baseUrl}/api/food/search?q=${searchQuery}`
            );
            setFoods(response.data.data);
         } catch (err) {
            setError(err.response?.data?.message || "Error fetching search results");
         }
         setLoading(false);
      };

      fetchSearchResults();
   }, [searchQuery]);

   return (
      <div className="search-results">
         <h2>Search Results for: &quot;{ searchQuery }&quot;</h2>
         { loading && <p>Loading...</p> }
         { error && <p className="error">{ error }</p> }
         <div className="food-list">
            { foods.length > 0 ? (
               foods.map((food) => (
                  <div key={ food._id } className="food-card">
                     <img src={ baseUrl + '/images/' + food.image } alt={ food.name } />
                     <h3>{ food.name }</h3>
                     <p>Price: ${ food.price }</p>
                  </div>
               ))
            ) : (
               !loading && <p>No foods found.</p>
            ) }
         </div>
      </div>
   );
};

export default SearchResults;
