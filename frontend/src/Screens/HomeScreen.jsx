import React, { useEffect } from "react";
import Products from "../components/Products";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { getListProducts } from "../actions/productActions";

function HomeScreen() {
  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products } = productsList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListProducts({}));
  }, [dispatch]);

  return (
    <div>
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
  );
}

export default HomeScreen;
