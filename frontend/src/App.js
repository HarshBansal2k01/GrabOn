import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState, useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
// import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails.js";

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  // font should load before everything done using useeffect
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka "]
      }
    });
    // the time site loads we want out user in that state
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {/* this is the ryt side part where logged user will be displayed */}
      {isAuthenticated && <UserOptions user={user} />}
      {/* <Routes> */}
      <Route exact path="/" element={<Home />} />
      <Route exact path="/product/:id" element={<ProductDetails />} />
      {/* all products  */}
      <Route exact path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/login" element={<LoginSignUp />} />
      {/* protected route is basically for taking authentticate user */}
      <Route exact path="/account" element={<Profile />} />
      <Route exact path="/me/update " element={<UpdateProfile />} />
      <Route exact path="/password/update" element={<UpdatePassword />} />
      <Route exact path="/shipping" element={<Shipping />} />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment" element={<Payment />} />
        </Elements>
      )}
      <Route exact path="/success" element={<OrderSuccess />} />
      <Route exact path="/orders" element={<MyOrders />} />

      <Routes>
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />

        <Route exact path="/order/:id" element={<OrderDetails />} />
      </Routes>

      {/* not protected below */}
      <Route exact path="/password/forgot" element={<ForgotPassword />} />
      <Route exact path="/password/reset/:token" element={<ResetPassword />} />
      <Route exact path="/cart" element={<Cart />} />
      {/* </Routes> */}

      <Footer />
    </Router>
  );
}

export default App;
