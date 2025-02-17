import { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

   const navigate = useNavigate();
   const { getTotalCartAmount, token, cartItems, food_list, baseUrl, } = useContext(StoreContext);
   const [data, setData] = useState({
      firstName: '', lastName: '',
      email: '', street: '',
      city: '', state: '',
      zipcode: '', country: '', phone: ''
   });


   //On change handler
   const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setData(data => ({ ...data, [name]: value }));
   };

   // Placing Order
   const submitHandler = async (e) => {
      e.preventDefault();

      try {
         const userId = localStorage.getItem("userId");

         if (!token) {
            toast.error("Authentication required. Please log in.");
            return;
         }
         if (!userId) {
            toast.error("User ID is missing. Please log in again.");
            return;
         }

         let orderItems = [];
         food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
               orderItems.push({
                  _id: item._id,
                  name: item.name,
                  price: item.price,
                  quantity: cartItems[item._id],
               });
            }
         });

         let orderData = {
            userId,
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
         };

         const response = await axios.post(
            baseUrl + "/api/order/place", orderData,
            { headers: { Authorization: `Bearer ${token}` }, }
         );

         if (response.data.success) {
            window.location.replace(response.data.session_url);
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Error placing order:", error);
         toast.error("Failed to place order. Please try again.");
      }
   };

   useEffect(() => {
      if (!token) {
         navigate('/cart');
      } else if (getTotalCartAmount() === 0) {
         navigate('/cart');
      }
   }, [token]);


   return (
      <form className='place-order' onSubmit={ submitHandler }>
         <div className="place-order-left">
            <p className="title">Delivery information</p>
            <div className="multi-fields">
               <input name='firstName' onChange={ onChangeHandler } type="text" placeholder='First name' value={ data.firstName } required />
               <input name='lastName' onChange={ onChangeHandler } type="text" placeholder='Last name' value={ data.lastName } required />
            </div>
            <input name='email' onChange={ onChangeHandler } value={ data.email } type="email" placeholder='Email address' required />
            <input name='street' onChange={ onChangeHandler } value={ data.street } type="text" placeholder='Street' required />
            <div className="multi-fields">
               <input name='city' onChange={ onChangeHandler } value={ data.city } type="text" placeholder='City' required />
               <input name='state' onChange={ onChangeHandler } value={ data.state } type="text" placeholder='State' required />
            </div>
            <div className="multi-fields">
               <input name='zipcode' onChange={ onChangeHandler } value={ data.zipcode } type="text" placeholder='Zip code' required />
               <input name='country' onChange={ onChangeHandler } value={ data.country } type="text" placeholder='Country' required />
            </div>
            <input name='phone' onChange={ onChangeHandler } value={ data.phone } type="text" placeholder='Phone' required />
         </div>
         <div className="place-order-right">
            <div className="cart-total">
               <h2>Cart Totals</h2>
               <div>
                  <div className="cart-total-details">
                     <p>Subtotal</p>
                     <p>${ getTotalCartAmount() }</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                     <p>Delivery Fee</p>
                     <p>${ getTotalCartAmount() === 0 ? 0 : 2 }</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                     <b>Total</b>
                     <b>${ getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2 }</b>
                  </div>
               </div>
               <button type='submit'>PROCEED TO PAYMENT</button>
            </div>
         </div>
      </form>
   );
};

export default PlaceOrder;
