import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { recountProductStock } from "../actions/productActions";
import CheckoutStep from "../components/CheckoutStep";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_RESET } from "../constanst/orderConstants";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);

  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  if (!cart.shippingAddress) {
    props.history.push("/shipping");
  }
  cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.taxPrice = 0.15 * cart.itemsPrice;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart }));
  };

  const { loading, error, success, order } = useSelector(
    (state) => state.orderCreate
  );

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch(recountProductStock(cart.cartItems));
      props.history.push(`/order/${order._id}`);
    }
  }, [dispatch, props, order, success, cart]);

  return (
    <div>
      <CheckoutStep step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {cart.shippingAddress?.fullName} <br />
                  <strong>Address: </strong>
                  {cart.shippingAddress?.address},{cart.shippingAddress?.city},{" "}
                  {cart.shippingAddress?.usState},{" "}
                  {cart.shippingAddress?.zipcode}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
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
                          {item.qty} x ${item.price.toFixed(2)} = $
                          {item.qty * item.price.toFixed(2)}
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
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                  <div>Shipping Fee</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                  <div>Taxes (15%)</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
                <hr />
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  className="primary block"
                  type="button"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
