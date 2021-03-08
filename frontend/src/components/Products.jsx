import React from "react";
import Rating from "./Rating";

function Products(props) {
  const { product } = props;
  return (
    <div className="card">
      <a href="product.html">
        <img src={product.image} alt="product" className="medium" />
      </a>
      <div className="card-body">
        <a href="product.html">
          <h2>{product.name}</h2>
        </a>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}

export default Products;
