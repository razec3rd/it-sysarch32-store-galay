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
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.product_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
