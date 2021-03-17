import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  getListProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constanst/productConstants";

function ProductListScreen(props) {
  const sellerMode = props.location.pathname.indexOf("/seller") >= 0;
  const { loading, error, products } = useSelector(
    (state) => state.productsList
  );
  const {
    product: productCreate,
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = useSelector((state) => state.productCreated);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
    resultMessage,
  } = useSelector((state) => state.productDelete);
  const { userInfo } = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      props.history.push(`/product/${productCreate._id}/edit`);
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(getListProducts({ seller: sellerMode ? userInfo._id : "" }));
  }, [
    productCreate,
    props,
    successCreate,
    dispatch,
    successDelete,
    sellerMode,
    userInfo,
  ]);

  const deleteProductHandler = (productId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(productId));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button
          type="button"
          className="primary"
          onClick={createProductHandler}
        >
          Create Product
        </button>
      </div>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {resultMessage && (
        <MessageBox variant="success">{resultMessage}</MessageBox>
      )}
      {loadingCreate && <LoadingBox />}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product._id}>
                <td>{i + 1}</td>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductListScreen;
