import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './firebase';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleCheckout = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Close popup after 3 seconds
  };

  return (
    <div className="container">
      <h1>Product Details</h1>
      <div className="product-details-container">
        <div className="product-image-container">
          <img src={product?.image_url} alt={product?.product_name} />
        </div>
        <div className="product-data">
          <h2>{product?.product_name}</h2>
          <p>{product?.product_description}</p>
          <p>Price: ${product?.price}</p>
          <p>Quantity: {product?.quantity}</p>
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>

        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Checkout is unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
