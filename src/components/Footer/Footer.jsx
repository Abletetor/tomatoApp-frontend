import { assets } from '../../assets/assets';
import './Footer.css';

const Footer = () => {
   return (
      <div className='footer' id='footer'>
         <div className="footer-content">
            <div className="footer-content-left">
               <img src={ assets.logo } alt="" />
               <p>Discover a seamless way to order your favorite meals with our TomatoApp. Browse a variety of delicious dishes, add them to your cart, and enjoy a smooth checkout experience. Fresh, fast, and hassle-free—your next meal is just a click away!</p>
               <div className="footer-social-icons">
                  <img src={ assets.facebook_icon } alt="" />
                  <img src={ assets.twitter_icon } alt="" />
                  <img src={ assets.linkedin_icon } alt="" />
               </div>
            </div>
            <div className="footer-content-center">
               <h2>COMPANY</h2>
               <ul>
                  <li>Home</li>
                  <li>About us</li>
                  <li>Delivery</li>
                  <li>Privacy Policy</li>
               </ul>
            </div>
            <div className="footer-content-right">
               <h2>GET IN TOUCH</h2>
               <ul>
                  <li>+233-540-8844-81</li>
                  <li>tomato@info.com</li>
               </ul>
            </div>
         </div>
         <hr />
         <p className='footer-copyright'>
            Copyright { new Date().getFullYear() } &copy; Tomato.com - All rights reserved.
         </p>
      </div>
   );
};

export default Footer;
