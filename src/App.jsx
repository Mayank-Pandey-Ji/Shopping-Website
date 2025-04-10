import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './contexts/CartContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <CartProvider>
        {isAuthenticated && <Header onLogout={handleLogout} />}
        <div className="container">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />
            } />
            <Route 
              path="/" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Home />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ProductDetail />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Cart />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
