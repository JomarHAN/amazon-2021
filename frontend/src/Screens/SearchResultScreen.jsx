import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getListProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Products from "../components/Products";

function SearchResultScreen(props) {
  const { category, name } = useParams();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productsList
  );
  useEffect(() => {
    dispatch(
      getListProducts({
        category: category !== "All" ? category : "",
        name: name !== "" ? name : "",
      })
    );
  }, [dispatch, category, name]);
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <h3>{products.length} Results</h3>
        )}
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <ul>
            <li>Category 1</li>
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="row center">
              {products.map((product) => (
                <Products key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResultScreen;
