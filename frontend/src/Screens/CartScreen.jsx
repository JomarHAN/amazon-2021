import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAddItem, cartDeleteItem } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import { CART_ADD_ITEM_FAIL_RESET } from "../constanst/cartConstants";
import numeral from "numeral";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const { cartItems, error } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(cartAddItem(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const handlerRemoveItem = (productId) => {
    dispatch(cartDeleteItem(productId));
  };

  const handleCheckout = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && (
          <MessageBox variant="danger">
            {error}{" "}
            <Link
              to="/"
              onClick={() => dispatch({ type: CART_ADD_ITEM_FAIL_RESET })}
            >
              Go Back to Shop
            </Link>{" "}
          </MessageBox>
        )}
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
                  <div>${numeral(item.price).format("0,0.00")}</div>
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
                {numeral(
                  cartItems.reduce((a, c) => a + c.qty * c.price, 0)
                ).format("0,0.00")}
              </h2>
            </li>
            {cartItems.length > 0 && (
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
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
