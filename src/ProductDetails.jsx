import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './firebase';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = firestore.collection('productList').doc(id);
      const doc = await productRef.get();
      if (doc.exists) {
        setProduct(doc.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <img src={product.image_url} alt={product.product_name} />
      <h2>{product.product_name}</h2>
      <p>{product.product_description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
}

export default ProductDetails;
