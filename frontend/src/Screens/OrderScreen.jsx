import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deliveryOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_DELIVERY_RESET,
  ORDER_PAY_RESET,
} from "../constanst/orderConstants";

function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = useSelector((state) => state.orderPay);
  const {
    loading: loadingDelivery,
    error: errorDelivery,
    success: successDelivery,
  } = useSelector((state) => state.orderDelivery);
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();

  const handleDelivery = () => {
    dispatch(deliveryOrder(order._id));
  };

  useEffect(() => {
    const addPaypalElement = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      (order && order._id !== orderId) ||
      successDelivery
    ) {
      dispatch({ type: ORDER_DELIVERY_RESET });
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalElement();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, order, successPay, successDelivery]);
  const successPaymentHandler = (result) => {
    dispatch(payOrder(order, result));
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping Information</h2>
                <p>
                  <strong>Name: </strong>
                  {order.shippingAddress?.fullName} <br />
                  <strong>Address: </strong>
                  {order.shippingAddress?.address},{order.shippingAddress?.city}
                  , {order.shippingAddress?.usState},{" "}
                  {order.shippingAddress?.zipcode}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {loading ? (
                  <LoadingBox />
                ) : order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.productId}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                  <div>Shipping Fee</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                  <div>Taxes (15%)</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
                <hr />
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox />
                  ) : (
                    <>
                      <h3>Sample Information</h3>
                      <p>
                        Email:{" "}
                        <strong>sb-qhok45092019@personal.example.com</strong>
                      </p>
                      <p>
                        Password: <strong> {`oGL/t1Y<`} </strong>
                      </p>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox />}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    </>
                  )}
                </li>
              )}
              {order.isPaid && !order.isDelivered && userInfo.isAdmin && (
                <li>
                  <button
                    className="primary block"
                    type="button"
                    onClick={() => handleDelivery()}
                  >
                    DELIVERY
                  </button>
                  {loadingDelivery && <LoadingBox />}
                  {errorDelivery && (
                    <MessageBox variant="danger">{errorDelivery}</MessageBox>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
