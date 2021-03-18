import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductDetail } from "../actions/productActions";
import Rating from "../components/Rating";

function ProductScreen(props) {
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const { product } = useSelector((state) => state.productDetail);
  const [imageViewing, setImageViewing] = useState("");
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

  const handleChange = (e) => {
    const images = document.querySelectorAll(".small-fixed");
    const imageIdClicked = e.target.id;
    for (var i = 0; i < images.length; i++) {
      images[i].classList.remove("active");
    }
    document.querySelector(`#${imageIdClicked}`).classList.add("active");
    setImageViewing(e.target.attributes[0].value);
  };

  return (
    <div>
      <Link to="/">Back to result</Link>
      <div className="row top">
        <div className="col-2">
          <div className="product-details">
            <img
              src={imageViewing ? imageViewing : product.imageAlbum.image1}
              alt={product.name}
              className="large"
            />
            <ul className="image-collection">
              <li className="item-collection">
                <img
                  src={product.imageAlbum.image1}
                  alt={product.name}
                  className="small-fixed active"
                  id="i-1"
                  onClick={handleChange}
                />
              </li>
              <li className="item-collection">
                <img
                  src={product.imageAlbum.image2}
                  alt={product.name}
                  className="small-fixed"
                  id="i-2"
                  onClick={handleChange}
                />
              </li>
              <li className="item-collection">
                <img
                  src={product.imageAlbum.image3}
                  alt={product.name}
                  className="small-fixed"
                  id="i-3"
                  onClick={handleChange}
                />
              </li>
              <li className="item-collection">
                <img
                  src={product.imageAlbum.image4}
                  alt={product.name}
                  className="small-fixed"
                  id="i-4"
                  onClick={handleChange}
                />
              </li>
            </ul>
          </div>
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
                <h3>
                  Seller{" "}
                  <Link to={`/seller/${product.seller._id}`}>
                    {product.seller.seller.business}
                  </Link>
                </h3>
                <Rating
                  rating={product.seller.seller.rating}
                  numReviews={product.seller.seller.numReviews}
                />
              </li>
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
