import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import Album from "./Album.js";
import Register from "./Register.js";
import ForgotPassword from "./ForgotPassword";
import UplodeImage from "./UplodeImage"
import App from "./App.js"
import LandingSell from "./LandingSell"
import LandingBuy from "./LandingBuy"
import PV from "./PV"
import AP3 from "./AP3"
import PO from "./PO"
import IB from "./IB"
import RV from "./RV"
import Admin from "./Admin"
import Inspector from "./Inspector"
import Preview from "./Preview"
import Home from "./Home"





ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Album" element={<Album />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/UplodeImage" element={<UplodeImage/>} />
      <Route path="/App" element={<App />} />
      <Route path="/LandingSell" element={<LandingSell />} />
      <Route path="/LandingBuy" element={<LandingBuy />} />
      <Route path="/PV" element={<PV />} />
      <Route path="/AP3" element={<AP3 />} />
      <Route path="/PO" element={<PO />} />
      <Route path="/IB" element={<IB />} />
      <Route path="/RV" element={<RV />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Inspector" element={<Inspector />} />
      <Route path="/Preview" element={<Preview />} />
      <Route path="/Home" element={<Home />} />
  

    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
