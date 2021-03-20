import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  getDraftDetail,
  publicDraftToProduct,
  removeDraft,
} from "../actions/draftActions";
import { PRODUCT_CREATE_RESET } from "../constanst/productConstants";
import { DRAFT_REMOVE_RESET } from "../constanst/draftConstants";

function DraftPreviewScreen(props) {
  const draftId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const { draft, loading, error } = useSelector((state) => state.draftDetail);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = useSelector((state) => state.productCreated);
  const {
    loading: loadingRemove,
    error: errorRemove,
    success: successRemove,
  } = useSelector((state) => state.draftRemove);

  const [imageViewing, setImageViewing] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch(removeDraft(draftId));
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (successRemove) {
      dispatch({ type: DRAFT_REMOVE_RESET });
      props.history.push("/draftslist/seller");
    }
    dispatch(getDraftDetail(draftId));
  }, [dispatch, draftId, successCreate, props, successRemove]);

  if (!draft) {
    return <div>Product Not Found</div>;
  }

  const handleChange = (e) => {
    const images = document.querySelectorAll(".small-fixed");
    const imageIdClicked = e.target.id;
    for (var i = 0; i < images.length; i++) {
      images[i].classList.remove("active");
    }
    document.querySelector(`#${imageIdClicked}`).classList.add("active");
    setImageViewing(e.target.attributes[0].value);
  };

  const handlePublic = () => {
    dispatch(publicDraftToProduct(draft));
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="row top">
            <div className="col-2">
              <div className="product-details">
                <img
                  src={imageViewing ? imageViewing : draft.imageAlbum.image1}
                  alt={draft.name}
                  className="large"
                />
                <ul className="image-collection">
                  <li className="item-collection">
                    <img
                      src={draft.imageAlbum.image1}
                      alt={draft.name}
                      className="small-fixed active"
                      id="i-1"
                      onClick={handleChange}
                    />
                  </li>
                  <li className="item-collection">
                    <img
                      src={draft.imageAlbum.image2}
                      alt={draft.name}
                      className="small-fixed"
                      id="i-2"
                      onClick={handleChange}
                    />
                  </li>
                  <li className="item-collection">
                    <img
                      src={draft.imageAlbum.image3}
                      alt={draft.name}
                      className="small-fixed"
                      id="i-3"
                      onClick={handleChange}
                    />
                  </li>
                  <li className="item-collection">
                    <img
                      src={draft.imageAlbum.image4}
                      alt={draft.name}
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
                  <h1>{draft.name}</h1>
                </li>
                <li>
                  <Rating rating={draft.rating} numReviews={draft.numReviews} />
                </li>
                <li>Price: ${draft.price.toFixed(2)}</li>
                <li>Description: {draft.description}</li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h3>
                      Seller{" "}
                      <Link to={`/seller/${draft.seller._id}`}>
                        {draft.seller.seller.business}
                      </Link>
                    </h3>
                    <Rating
                      rating={draft.seller.seller.rating}
                      numReviews={draft.seller.seller.numReviews}
                    />
                  </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${draft.price.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {draft.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {draft.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(draft.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <form className="form">
                <div>
                  <button
                    type="button"
                    className="primary block"
                    onClick={handlePublic}
                  >
                    <strong>PUBLIC</strong>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="block"
                    onClick={() => props.history.push("/draftslist/seller")}
                  >
                    <strong>LATER</strong>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="block"
                    onClick={() => props.history.push(`/draft/${draftId}`)}
                  >
                    <strong>EDIT</strong>
                  </button>
                </div>
                {loadingCreate && <LoadingBox />}
                {errorCreate && (
                  <MessageBox variant="danger">{errorCreate}</MessageBox>
                )}
                {loadingRemove && <LoadingBox />}
                {errorRemove && (
                  <MessageBox variant="danger">{errorRemove}</MessageBox>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DraftPreviewScreen;
