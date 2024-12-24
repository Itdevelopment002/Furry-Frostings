import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Import components
import Navbar from './components/Navbar';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage'; // You can create this page for Products
// import UsersPage from './pages/UsersPage';

// Import Redux store and react-redux hooks
import { Provider } from 'react-redux';
import { store } from './app/store'; // Assuming store is already set up

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Container className="mt-4">
          <Routes>
            {/* Define routes for different pages */}
            <Route path="/" element={<h1>Welcome to Admin Dashboard</h1>} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            {/* <Route path="/users" element={<UsersPage />} /> */}
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
