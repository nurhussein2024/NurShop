import React from 'react';
import './App.scss'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, CategoryProduct, ProductSingle, Cart } from "./pages/index";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>    
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Routes>
            {/* startsidans route */}
            <Route exact path="/" element={<Home />} />
            {/* single product route */}
            <Route path="/product/:id" element={<ProductSingle />} />
            {/* kategori av produktlistningsväg */}
            <Route path="/category/:category" element={<CategoryProduct />} />
            {/* routing av cart */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
