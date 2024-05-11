import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './firebase';
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe.js library with your publishable API key
const stripePromise = loadStripe('pk_test_51PF3CVKc9mA0L11GZKqkFqGffhB1RKM2ntg4NGI1R4ymMkFh9kxHKFDY0u02ZHQE4SkHPW6NmxVD8jkSeZC9mOm400kCzO9768'); // Replace with your publishable key

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

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

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://34.142.240.52/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName: product.product_name,
        price: product.price * 100, // Convert price to cents for Stripe
      }),
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
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
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
