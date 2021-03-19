import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProducts } from "../actions/productActions";
import { getUserProfile, postReviewSeller } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Products from "../components/Products";
import Rating from "../components/Rating";
import { USER_REVIEW_RESET } from "../constanst/userConstants";

function SellerScreen(props) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const { loading, error, user } = useSelector((state) => state.userProfile);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = useSelector((state) => state.userReview);
  const {
    loading: loadingProduct,
    error: errorProduct,
    products,
  } = useSelector((state) => state.productsList);
  const sellerId = props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successReview || sellerId) {
      dispatch({ type: USER_REVIEW_RESET });
    }
    dispatch(getListProducts({ seller: sellerId }));
    dispatch(getUserProfile(sellerId));
  }, [dispatch, sellerId, successReview]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(postReviewSeller({ comment, rating }));
  };

  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <ul className="card card-body">
              <li>
                <div className="row start">
                  <div className="p-1">
                    <img
                      src={user?.seller.logo}
                      alt={user?.seller.business}
                      className="small"
                    />
                  </div>
                  <div className="p-1">
                    <h1>{user?.seller.business}</h1>
                  </div>
                </div>
              </li>
              <li>
                <Rating
                  rating={user?.seller.rating}
                  numReviews={user?.seller.numReviews}
                />
              </li>
              <li>
                <a href={`mailto:${user?.email}`}>
                  Contact {user?.seller?.business}
                </a>
              </li>
              <li>{user?.seller?.description}</li>
            </ul>
            <form onSubmit={handleReviewSubmit} className="form">
              <h1>Rate Service of {user?.seller.business}</h1>
              <div>
                {/* <label htmlFor="Rate">Rate</label> */}
                <select
                  name="Rate"
                  id="Rate"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Bad</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Okay</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Professonal</option>
                </select>
              </div>
              <div>
                {/* <label htmlFor="Comment">Comment</label> */}
                <textarea
                  id="Comment"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Feedback here"
                ></textarea>
              </div>
              <div>
                {/* <label></label> */}
                <button className="primary block">Post</button>
              </div>
            </form>
            {user?.seller.reviews.length === 0 && (
              <MessageBox>No Review Until Now</MessageBox>
            )}
            {errorReview && (
              <MessageBox variant="danger">{errorReview}</MessageBox>
            )}
            {loadingReview && <LoadingBox />}
            {user?.seller.reviews.map((review) => (
              <div className="card card-body">
                <strong>{review.buyerName}</strong>
                <Rating rating={review.rating} caption />
                <small>{review.createdAt.substring(0, 10)}</small>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-3">
        {loadingProduct ? (
          <LoadingBox />
        ) : errorProduct ? (
          <MessageBox variant="danger">{errorProduct}</MessageBox>
        ) : (
          <>
            {products.length === 0 && (
              <MessageBox>No Products Found</MessageBox>
            )}
            <div className="row center">
              {products.map((product) => (
                <Products key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SellerScreen;
