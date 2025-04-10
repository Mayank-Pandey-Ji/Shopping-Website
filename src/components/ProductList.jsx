import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <ProductCard product={product} />
        </div>
      ))}
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 20px;
        }
        
        @media (min-width: 576px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 992px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;