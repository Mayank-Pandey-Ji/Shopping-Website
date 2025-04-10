import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useState, useEffect } from 'react';

const Header = ({ onLogout }) => {
  const { cart } = useCart();
  const [itemCount, setItemCount] = useState(0);
  
  useEffect(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  }, [cart]);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">ShopReact</Link>
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li>
              <Link to="/cart">
                Cart {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
              </Link>
            </li>
            <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
          </ul>
        </nav>
      </div>
      <style jsx>{`
        .header {
          background-color: var(--white);
          box-shadow: var(--box-shadow);
          padding: 15px 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--primary-color);
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          gap: 20px;
          align-items: center;
        }
        
        .nav-links a {
          color: var(--text-color);
          font-weight: 500;
        }
        
        .nav-links a:hover {
          color: var(--primary-color);
        }
        
        .cart-count {
          background-color: var(--accent-color);
          color: var(--white);
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 0.75rem;
          margin-left: 5px;
        }
        
        .logout-btn {
          background: none;
          border: none;
          color: var(--text-color);
          font-size: 1rem;
          font-weight: 500;
          padding: 0;
        }
        
        .logout-btn:hover {
          color: var(--accent-color);
          background: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
