import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Popup from '../components/Popup';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (isLoading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-link">← Back to Products</Link>
      
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <div className="product-rating">
              <span className="rating-value">{product.rating.rate} ★</span>
              <span className="rating-count">({product.rating.count} reviews)</span>
            </div>
          </div>
          
          <div className="product-price">${product.price.toFixed(2)}</div>
          
          <p className="product-description">{product.description}</p>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              >
                {[...Array(10).keys()].map(num => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
            </div>
            
            <button 
              className="add-to-cart-btn btn-secondary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      {showPopup && (
        <Popup
          message="Product added to cart!"
          isVisible={showPopup}
          onClose={closePopup}
        />
      )}
      
      <style jsx>{`
        .product-detail-page {
          padding-bottom: 40px;
        }
        
        .back-link {
          display: inline-block;
          margin-bottom: 20px;
          color: var(--dark-gray);
        }
        
        .product-detail {
          display: flex;
          flex-direction: column;
          gap: 30px;
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          padding: 20px;
        }
        
        .product-image {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background-color: var(--white);
          border-radius: 8px;
        }
        
        .product-image img {
          max-width: 100%;
          max-height: 300px;
          object-fit: contain;
        }
        
        .product-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }
        
        .product-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        
        .product-category {
          background-color: var(--light-gray);
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.9rem;
          text-transform: capitalize;
        }
        
        .product-rating {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .rating-value {
          font-weight: bold;
          color: #f39c12;
        }
        
        .rating-count {
          color: var(--dark-gray);
          font-size: 0.9rem;
        }
        
        .product-price {
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--primary-color);
          margin-bottom: 20px;
        }
        
        .product-description {
          line-height: 1.8;
          margin-bottom: 30px;
        }
        
        .product-actions {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .quantity-selector label {
          font-weight: 600;
        }
        
        .quantity-selector select {
          width: 70px;
        }
        
        .add-to-cart-btn {
          padding: 12px 24px;
          font-size: 1.1rem;
        }
        
        @media (min-width: 768px) {
          .product-detail {
            flex-direction: row;
          }
          
          .product-image {
            flex: 1;
          }
          
          .product-info {
            flex: 1;
          }
          
          .product-actions {
            flex-direction: row;
            align-items: center;
          }
          
          .add-to-cart-btn {
            flex-grow: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;