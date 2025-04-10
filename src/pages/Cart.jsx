import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Popup from '../components/Popup';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, clearCart, getCartTotal } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
        <style jsx>{`
          .empty-cart {
            text-align: center;
            padding: 40px 0;
          }
          
          .continue-shopping {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: var(--primary-color);
            color: var(--white);
            border-radius: 4px;
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)}):</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          
          <div className="summary-total">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          
          <button 
            className="checkout-btn btn-secondary"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          
          <Link to="/" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>
      
      {showPopup && (
        <Popup
          message="Order placed successfully!"
          isVisible={showPopup}
          onClose={closePopup}
        />
      )}
      
      <style jsx>{`
        .cart-page {
          padding-bottom: 40px;
        }
        
        .cart-container {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .cart-items {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          overflow: hidden;
        }
        
        .cart-summary {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          padding: 20px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          border-bottom: 1px solid var(--light-gray);
        }
        
        .summary-total {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        
        .checkout-btn {
          width: 100%;
          padding: 12px;
          font-size: 1.1rem;
          margin-bottom: 15px;
        }
        
        .continue-shopping-link {
          display: block;
          text-align: center;
          color: var(--primary-color);
          font-weight: 500;
        }
        
        @media (min-width: 768px) {
          .cart-container {
            flex-direction: row;
            align-items: flex-start;
          }
          
          .cart-items {
            flex: 2;
          }
          
          .cart-summary {
            flex: 1;
            position: sticky;
            top: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;