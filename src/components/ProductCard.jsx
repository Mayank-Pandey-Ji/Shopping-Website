import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-img-container">
          <img src={product.image} alt={product.title} className="product-img" />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-category">{product.category}</p>
        </div>
      </Link>
      <style jsx>{`
        .product-card {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .product-card a {
          display: flex;
          flex-direction: column;
          height: 100%;
          color: var(--text-color);
        }
        
        .product-img-container {
          padding: 20px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--white);
        }
        
        .product-img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
        
        .product-info {
          padding: 15px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        
        .product-title {
          margin-bottom: 10px;
          font-size: 1rem;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 3.2rem;
        }
        
        .product-price {
          font-weight: bold;
          font-size: 1.25rem;
          color: var(--primary-color);
          margin-top: auto;
          margin-bottom: 5px;
        }
        
        .product-category {
          color: var(--dark-gray);
          font-size: 0.85rem;
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;