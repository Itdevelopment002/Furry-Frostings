import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../features/orders/ordersSlice'; // You'll need to create this slice for orders
import { Table, Spinner, Button } from 'react-bootstrap';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders()); // Fetch orders from the server
  }, [dispatch]);

  const handleManageOrder = (orderId) => {
    // Redirect to order management or details page
    console.log(`Manage order ${orderId}`);
  };

  return (
    <div>
      <h2>Orders</h2>
      {status === 'loading' ? (
        <Spinner animation="border" />
      ) : status === 'failed' ? (
        <p>{error}</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>
                  <Button variant="primary" onClick={() => handleManageOrder(order.id)}>
                    Manage
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrdersPage;
