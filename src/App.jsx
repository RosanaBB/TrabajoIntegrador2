import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import AuthContext from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Categories from './components/Categories';
import Products from './components/Products';
import Authentication from './components/Authentication';
import ProductCreationEdit from './components/ProductCreationEdit';
import CategoryCreationEdit from './components/CategoryCreationEdit';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import { CartProvider } from './contexts/CartContext';
import AuthContextProvider from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthContextProvider>
              <CartProvider>
                <MainLayout />
              </CartProvider>
            </AuthContextProvider>
          }
        >
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="authentication" element={<Authentication />} />
          <Route
            path="product-creation-edit"
            element={<ProductCreationEdit />}
          />
          <Route
            path="category-creation-edit"
            element={<CategoryCreationEdit />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <div className="Links">
      <nav>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/categories"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Categories
          </Link>
        </li>
        <li>
          <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Register
          </Link>
        </li>
      </nav>

      <Outlet />
    </div>
  );
}

function AdminRoutes({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const currentLocation = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: currentLocation }} replace />;
  }

  return children;
}

export default App;
