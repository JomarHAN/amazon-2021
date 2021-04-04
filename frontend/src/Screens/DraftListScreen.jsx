import numeral from "numeral";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDraftList, removeDraft } from "../actions/draftActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { DRAFT_REMOVE_RESET } from "../constanst/draftConstants";

function DraftListScreen(props) {
  const sellerMode = props.location.pathname.indexOf("/seller") > 0;
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const { loading, error, drafts } = useSelector((state) => state.draftList);
  const {
    loading: loadingRemove,
    error: errorRemove,
    success: successRemove,
  } = useSelector((state) => state.draftRemove);

  useEffect(() => {
    if (successRemove) {
      dispatch({ type: DRAFT_REMOVE_RESET });
    }
    dispatch(getDraftList({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, sellerMode, userInfo, successRemove]);

  const handleRemove = (draftId) => {
    if (window.confirm("Are you sure to remove this one?")) {
      dispatch(removeDraft(draftId));
    }
  };

  return (
    <div>
      {loadingRemove && <LoadingBox />}
      {errorRemove && <MessageBox variant="danger">{errorRemove}</MessageBox>}
      <h1>Draft List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            {!sellerMode && userInfo.isAdmin && <th>SELLER</th>}
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>FIELDS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {loading && <LoadingBox />}
          {error && <MessageBox>{error}</MessageBox>}
          {drafts?.map((d, i) => (
            <tr key={d._id}>
              <td>{i + 1}</td>
              {!sellerMode && userInfo.isAdmin && <th>{d.seller.name}</th>}
              <td>{d._id}</td>
              <td>{d.name}</td>
              <td>{numeral(d.price).format("0,0.00")}</td>
              <td>{d.category}</td>
              <td>{d.brand}</td>
              <td>{d.fields}</td>
              <td>
                <button
                  type="button"
                  className="primary small"
                  onClick={() => props.history.push(`/preview/${d._id}`)}
                >
                  Preview
                </button>
                {sellerMode && (
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/draft/${d._id}`)}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  className="small delete"
                  onClick={() => handleRemove(d._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DraftListScreen;
