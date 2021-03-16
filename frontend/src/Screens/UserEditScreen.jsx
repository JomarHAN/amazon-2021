import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateUser, getUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_ADMIN_UPDATE_RESET } from "../constanst/userConstants";

function UserEditScreen(props) {
  const userId = props.match.params.id;
  const { loading, error, user } = useSelector((state) => state.userProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userAdminUpdate);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      adminUpdateUser({ _id: user._id, name, email, isAdmin, isSeller })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_ADMIN_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user || user._id !== userId) {
      dispatch(getUserProfile(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsSeller(user.isSeller);
    }
  }, [userId, dispatch, user, successUpdate, props]);
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h1>User Edit</h1>
        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                value={name}
                id="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                value={email}
                id="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="IsAdmin">Is Admin</label>
              <input
                type="checkbox"
                checked={isAdmin}
                id="IsAdmin"
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="IsSeller">Is Seller</label>
              <input
                type="checkbox"
                checked={isSeller}
                id="IsSeller"
                onChange={(e) => setIsSeller(e.target.checked)}
              />
            </div>
            <div>
              <label />
              <button className="primary block" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default UserEditScreen;
