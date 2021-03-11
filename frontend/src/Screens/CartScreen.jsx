import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAddItem, cartDeleteItem } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(cartAddItem(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const handlerRemoveItem = (productId) => {
    dispatch(cartDeleteItem(productId));
  };

  const handleCheckout = () => {};

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.productId}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          cartAddItem(item.productId, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price.toFixed(2)}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handlerRemoveItem(item.productId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                className="primary block"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
