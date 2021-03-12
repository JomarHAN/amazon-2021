import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductDetail } from "../actions/productActions";
import Rating from "../components/Rating";
import data from "../data";

function ProductScreen(props) {
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const { product } = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, [dispatch, productId]);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
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
              {product.countInStock > 0 && (
                <>
                  <li>
                    <div className="row">
                      <div>Qty</div>
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      className="primary block"
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
