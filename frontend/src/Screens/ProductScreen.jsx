import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import data from "../data";

function ProductScreen(props) {
  const productId = props.match.params.id;
  const product = data.products.find((x) => x._id === Number(productId));
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div>
      <Link to="/">Back to result</Link>
      <div className="row top">
        <div className="col-2">
          <img src={product.image} alt={product.name} className="large" />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li>Price: ${product.price}</li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="danger">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button
                  className="primary block"
                  disabled={product.countInStock <= 0}
                >
                  Add to cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
