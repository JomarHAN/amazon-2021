import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDraft } from "../actions/draftActions";
import { deleteProduct, getListProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { DRAFT_CREATE_RESET } from "../constanst/draftConstants";
import { PRODUCT_DELETE_RESET } from "../constanst/productConstants";

function ProductListScreen(props) {
  const sellerMode = props.location.pathname.indexOf("/seller") >= 0;
  const { loading, error, products } = useSelector(
    (state) => state.productsList
  );
  const {
    loading: loadingDraft,
    error: errorDraft,
    product: productDraft,
    success: successDraft,
  } = useSelector((state) => state.draftCreated);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
    resultMessage,
  } = useSelector((state) => state.productDelete);
  const { userInfo } = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDraft) {
      props.history.push(`/draft/${productDraft._id}`);
      dispatch({ type: DRAFT_CREATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(getListProducts({ seller: sellerMode ? userInfo._id : "" }));
  }, [
    props,
    dispatch,
    successDelete,
    sellerMode,
    userInfo,
    successDraft,
    productDraft,
  ]);

  const deleteProductHandler = (productId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(productId));
    }
  };
  const createProductHandler = () => {
    dispatch(createDraft());
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
      {loadingDraft && <LoadingBox />}
      {errorDraft && <MessageBox variant="danger">{errorDraft}</MessageBox>}
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
