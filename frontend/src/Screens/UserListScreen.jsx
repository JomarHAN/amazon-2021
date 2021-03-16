import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function UserListScreen(props) {
  const { loading, error, users } = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  const deleteUserHandler = (userId) => {};

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);
  return (
    <div>
      <h1>Users List</h1>
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
