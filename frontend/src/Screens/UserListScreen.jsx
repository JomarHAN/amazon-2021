import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DELETE_RESET } from "../constanst/userConstants";

function UserListScreen(props) {
  const { loading, error, users } = useSelector((state) => state.userList);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
    message: messageDelete,
  } = useSelector((state) => state.userDelete);
  const dispatch = useDispatch();

  const deleteUserHandler = (userId) => {
    if (window.confirm(`Are you sure to delete User: ${userId}`)) {
      dispatch(deleteUser(userId));
    }
  };

  useEffect(() => {
    if (successDelete) {
      window.alert(`${messageDelete}`);
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(getUserList());
  }, [dispatch, successDelete, messageDelete]);
  return (
    <div>
      <h1>Users List</h1>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? "Yes" : "No"}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="small"
                    type="button"
                    onClick={() => props.history.push(`/profile/${user._id}`)}
                  >
                    Details
                  </button>
                  <button
                    className="small"
                    type="button"
                    onClick={() => deleteUserHandler(user._id)}
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

export default UserListScreen;
