import numeral from "numeral";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrderList } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constanst/orderConstants";

function OrderListScreen(props) {
  const { loading, error, orders } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userSignin);
  const sellerMode = props.location.pathname.indexOf("/seller") >= 0;
  const seller = sellerMode ? userInfo._id : "";
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.orderDelete);
  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
    dispatch(getOrderList({ seller }));
  }, [dispatch, successDelete, seller, sellerMode]);

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Are you sure to delete the order ${orderId}`)) {
      dispatch(deleteOrder(orderId));
    }
  };

  return (
    <div>
      <h1>Orders List</h1>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
            {orders?.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>${numeral(order.totalPrice).format("0,0.00")}</td>
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
