import React from 'react';
// import ReactDOM from 'react-dom';
import Home from './pages/Home/Home';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Shop from './pages/Shop/Shop';
import About from './pages/About/About';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import PageTitle from './components/Page-Title/pageTitle';
import Product from './pages/Product/Product';
// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
import {Routes, Route } from 'react-router-dom';

// JS: window.location.pathname ex: /, /shop, /about
const pathname = window.location.pathname;

function App() {
  return (
      <div className="d-flex flex-column m-height-100">
      
        <Header />

        {/* Config Routes pages */}
       
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="shop">
                    <Route path=":id" element={<Product />} />
                    <Route index element={<Shop />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />

        </Routes>
        <Footer />
        
      </div>
  );
}

export default App;