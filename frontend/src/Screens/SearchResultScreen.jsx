import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getListProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Products from "../components/Products";

function SearchResultScreen(props) {
  const { fields = "All", name = "All", category = "All" } = useParams();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productsList
  );
  const categories = products?.reduce(
    (a, b) => (a.includes(b.category) ? a : [...a, b.category]),
    []
  );

  useEffect(() => {
    dispatch(
      getListProducts({
        fields: fields !== "All" ? fields : "",
        name: name !== "All" ? name : "",
        category: category !== "All" ? category : "",
      })
    );
  }, [dispatch, fields, name, category]);

  const getSearchUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    return `/search/fields/${fields}/name/${filterName}/category/${filterCategory}`;
  };

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
            <li>
              <Link to={getSearchUrl({ category: "All" })}>All</Link>
            </li>
            {categories?.map((c) => (
              <li key={c}>
                <Link to={getSearchUrl({ category: c })}>{c}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
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
    </div>
  );
}

export default SearchResultScreen;
