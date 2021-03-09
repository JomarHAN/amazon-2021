import React from "react";

function CartScreen(props) {
  console.log(props);
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  return (
    <div>
      cart here: productId {productId} and qty: {qty}
    </div>
  );
}

export default CartScreen;
