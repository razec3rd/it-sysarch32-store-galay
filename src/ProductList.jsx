import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from './firebase';
import { firebase } from './firebase';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = firestore.collection('productList');
      const snapshot = await productsRef.get();
      const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
<div className="container">
      <h1>Product List</h1>
      <div className="product-list-container">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <Link to={`/product/${product.id}`}>
              <img src={product.image_url} alt={product.product_name} />
              <h3>{product.product_name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
