import { useCart } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { updateCartItemQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    updateCartItemQuantity(item.id, newQuantity);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <label htmlFor={`quantity-${item.id}`}>Qty:</label>
          <select 
            id={`quantity-${item.id}`}
            value={item.quantity} 
            onChange={handleQuantityChange}
          >
            {[...Array(10).keys()].map(num => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
        </div>
        <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          className="btn-danger remove-btn"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
      <style jsx>{`
        .cart-item {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 15px;
          border-bottom: 1px solid var(--medium-gray);
        }
        
        .cart-item-img {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cart-item-img img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .cart-item-details {
          flex-grow: 1;
        }
        
        .cart-item-details h3 {
          margin-bottom: 5px;
          font-size: 1rem;
        }
        
        .cart-item-price {
          color: var(--dark-gray);
        }
        
        .cart-item-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }
        
        .quantity-control {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .quantity-control select {
          width: auto;
        }
        
        .item-total {
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .remove-btn {
          padding: 5px 10px;
          font-size: 0.85rem;
        }
        
        @media (min-width: 768px) {
          .cart-item {
            flex-direction: row;
            align-items: center;
          }
          
          .cart-item-actions {
            flex-direction: row;
            align-items: center;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItem;