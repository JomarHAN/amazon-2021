import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function OrderListScreen(props) {
  const { loading, error, orders } = useSelector((state) => state.orderList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);
  const handleDeleteOrder = (orderId) => {};
  return (
    <div>
      <h1>Orders List</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    className="small"
                    type="button"
                    onClick={() => props.history.push(`/order/${order._id}`)}
                  >
                    Detail
                  </button>
                  <button
                    className="small"
                    type="button"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderListScreen;
