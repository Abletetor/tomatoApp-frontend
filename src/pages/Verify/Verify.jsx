/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css';
import { StoreContext } from '../../context/StoreContext';
import { useContext, useEffect } from 'react';
import axios from 'axios';

export default function Verify () {
   const [searchParams] = useSearchParams();
   const success = searchParams.get('success');
   const orderId = searchParams.get('orderId');
   const navigate = useNavigate();
   const { baseUrl } = useContext(StoreContext);

   //verify payment
   const verifyPayment = async () => {
      try {
         const response = await axios.post(`${baseUrl}/api/order/verify`, { success, orderId });

         if (response.data.success) {
            navigate('/myorders');
         } else { navigate('/'); }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => { verifyPayment(); }, []);

   return (
      <div className='verify'>
         <div className="spinner"></div>
      </div>
   );
}
