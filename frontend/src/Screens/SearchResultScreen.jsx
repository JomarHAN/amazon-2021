import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getListProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Products from "../components/Products";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";

function SearchResultScreen(props) {
  const {
    fields = "All",
    name = "All",
    category = "All",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
  } = useParams();
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
        min,
        max,
        rating,
        order,
      })
    );
  }, [dispatch, fields, name, category, min, max, rating, order]);

  const getSearchUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    const filterOrder = filter.order || order;
    const filterRating =
      filter.rating || rating
        ? filter.rating
        : filter.rating === 0
        ? 0
        : rating;
    return `/search/fields/${fields}/name/${filterName}/category/${filterCategory}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${filterOrder}`;
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
        <div>
          Sort By{" "}
          <select
            value={order}
            onChange={(e) =>
              props.history.push(getSearchUrl({ order: e.target.value }))
            }
          >
            <option value="newest">Newest Arrival</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Best Avg.</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h1>Department</h1>
          <div>
            <h3>Category</h3>
            <ul>
              <li>
                <Link
                  className={category === "All" ? "active" : ""}
                  to={getSearchUrl({ category: "All" })}
                >
                  All
                </Link>
              </li>
              {categories?.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? "active" : ""}
                    to={getSearchUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getSearchUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Customer Avg.</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.rating}>
                  <Link
                    to={getSearchUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? "active" : ""}
                  >
                    <Rating caption={" & Up"} rating={r.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
