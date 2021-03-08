import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Products(props) {
  const { product } = props;
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt="product" className="medium" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}

export default Products;
