import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

function App() {
  return (
    <Router>
      <div>
        <div className="navbar">
          <h1>Raz Shop</h1>
        </div>
        <div className="divider"></div>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
