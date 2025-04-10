import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Filter products based on category and search term
  useEffect(() => {
    if (!products.length) return;

    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="home-page">
      <h1>Products</h1>
      
      <div className="filters">
        <div className="category-filter">
          <label htmlFor="category">Category:</label>
          <select 
            id="category" 
            value={selectedCategory} 
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-results">No products found matching your criteria.</div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
      
      <style jsx>{`
        .home-page {
          padding-bottom: 40px;
        }
        
        .filters {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .category-filter, .search-filter {
          flex: 1;
        }
        
        .category-filter label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .loading, .error, .no-results {
          text-align: center;
          padding: 40px 0;
          font-size: 1.1rem;
        }
        
        .error {
          color: var(--accent-color);
        }
        
        @media (min-width: 768px) {
          .filters {
            flex-direction: row;
            align-items: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
