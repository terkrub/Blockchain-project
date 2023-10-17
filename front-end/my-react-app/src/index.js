import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import VerifyShoeNFT from './VerifyShoeNFT';
import Home from'./Components/Home';
import NFTPortfolio from './NFTPortfolio';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Mynfts from './Components/Mynfts';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App/>}/>
      <Route path="/identify_shoe" element={<VerifyShoeNFT/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/mynfts" element={<Mynfts/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
