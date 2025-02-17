/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
   // eslint-disable-next-line no-unused-vars
   const { baseUrl, token, setToken } = useContext(StoreContext);
   const [currentState, setCurrentState] = useState("Login");
   const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
   });

   //Handle Input Change
   const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setData(data => ({ ...data, [name]: value }));
   };

   //Handle Form Submission
   const onSubmitHandler = async (e) => {
      e.preventDefault();

      let newUrl = currentState === "Login"
         ? `${baseUrl}/api/user/login`
         : `${baseUrl}/api/user/register`;

      try {
         const response = await axios.post(newUrl, data);

         if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            toast.success(response.data.message);
            setShowLogin(false);
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Error in authentication:", error);
         toast.error("Authentication failed.");
      }
   };


   return (
      <div className='login-popup'>
         <form className="login-popup-container" onSubmit={ onSubmitHandler }>
            <div className="login-popup-title">
               <h2>{ currentState }</h2>
               <img onClick={ () => setShowLogin(false) } src={ assets.cross_icon } alt="" />
            </div>
            <div className="login-popup-inputs">
               { currentState === 'Login' ? <></> : <input type="text" placeholder='Your Name' name='name' required onChange={ onChangeHandler } value={ data.name } /> }
               <input type="email" placeholder='Your Email' name='email' onChange={ onChangeHandler } value={ data.email } required />
               <input type="password" placeholder='Your Password' name='password' onChange={ onChangeHandler } value={ data.password } required />
            </div>
            <button type='submit'>
               { currentState === "Sign Up" ? "Create account" : "Login" }
            </button>
            { currentState == 'Sign Up' ?
               <div className="login-popup-conditions">
                  <input type="checkbox" required />
                  <p>By continuing, I agree to the terms of use & privacy policy</p>
               </div> : ""
            }
            { currentState === "Login" ?
               <p>Create new account? <span onClick={ () => setCurrentState("Sign Up") }>Click here</span></p> :
               <p>Already have an account? <span onClick={ () => setCurrentState("Login") }>Login here</span></p>
            }
         </form>

      </div>
   );
};

export default LoginPopup;
