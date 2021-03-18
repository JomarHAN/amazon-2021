import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProducts } from "../actions/productActions";
import { getUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Products from "../components/Products";
import Rating from "../components/Rating";

function SellerScreen(props) {
  const { loading, error, user } = useSelector((state) => state.userProfile);
  const {
    loading: loadingProduct,
    error: errorProduct,
    products,
  } = useSelector((state) => state.productsList);
  const sellerId = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListProducts({ seller: sellerId }));
    dispatch(getUserProfile(sellerId));
  }, [dispatch, sellerId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
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
                Contact {user?.seller.business}
              </a>
            </li>
            <li>{user?.seller.description}</li>
          </ul>
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
