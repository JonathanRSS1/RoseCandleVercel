import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Componentes
import Nav from "../../global/components/Nav.jsx"; 
import Footer from "../../global/components/Footer.jsx"; 
import MarqueeBanner from "../../global/components/MarqueeBanner.jsx"; 

// Páginas
import Home from "../../pages/Home.jsx";
import AboutUs from "../../pages/AboutUs/AboutUs.jsx";
import Faqs from "../../pages/Faqs/Faqs.jsx";
import Products from "../../pages/Products/Products.jsx";
import ProductDetail from "../../pages/Products/ProductDetail.jsx";
import Profile from "../../pages/Profile/Profile.jsx";
import Cart from "../../pages/shoppingCard/ShoppingCard.jsx";
import LoginCustomer from "../../pages/LoginCustomer/LoginCustomer.jsx";
import TermsAndConditions from "../../pages/TermsAndConditions/TermsAndConditions.jsx"
import PasswordRecovery from "../../pages/RecoveryPassword/logic/RecoveryPassword.jsx";

// Auth
import { AuthProvider } from "../../global/context/AuthContext.jsx";
import ProtectedRoutes from "../../pages/LoginCustomer/ProtectedRoute.jsx";

function Navigation() {
      const location = useLocation();

      // Donde mostrar el marquee
  const showMarquee = ["/", "/aboutUs", "/faqs", "/products"].includes(
    location.pathname
  );

  // Aqui no aparece el footer y el nav
  const noNavFooterRoutes = ["/loginCustomer", "/recoveryPassword"];
    const hideNavFooter = noNavFooterRoutes.includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen">
      {showMarquee && <MarqueeBanner />}

      {!hideNavFooter && <Nav/>}

      <div className=""> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginCustomer" element={<LoginCustomer />} />
          <Route path="/recoveryPassword" element={<PasswordRecovery />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faqs" element={<Faqs />} />
         <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>

      {!hideNavFooter && <Footer/>}
    </div>
  );
}

export default Navigation;