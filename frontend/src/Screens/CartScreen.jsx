import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartAddItem } from "../actions/cartActions";

function CartScreen(props) {
  console.log(props);
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(cartAddItem(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <div>
      cart here: productId {productId} and qty: {qty}
    </div>
  );
}

export default CartScreen;
