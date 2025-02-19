import { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
   const { baseUrl, token } = useContext(StoreContext);
   const [data, setData] = useState([]);

   const fetchOrders = async () => {
      try {
         const response = await axios.get(`${baseUrl}/api/order/userorders`, {
            headers: { Authorization: `Bearer ${token}` }
         });

         setData(response.data.data);
      } catch (err) {
         console.error("Error fetching orders:", err.response ? err.response.data : err.message);
      }
   };

   useEffect(() => {
      if (token) {
         fetchOrders();
      }
   }, [token]);


   return (
      <div className='my-orders'>
         <h2>My Orders</h2>
         <div className="container">
            { data.map((order, index) => (
               <div className="my-orders-order" key={ index }>
                  <img src={ assets.parcel_icon } alt="" />
                  <p>{ order.items.map((item, index) => {
                     if (index === order.items.length - 1) {
                        return item.name + ' x ' + item.quantity;
                     } else {
                        return item.name + ' x ' + item.quantity + ', ';
                     }
                  }) }</p>
                  <p>${ order.amount }.00</p>
                  <p>Items: { order.items.length }</p>
                  <p><span>&#x25cf;</span> <b className='status'>{ order.status }</b></p>
                  <button onClick={ fetchOrders }>Track Order</button>
               </div>
            )) }
         </div>

      </div>
   );
};

export default MyOrders;
