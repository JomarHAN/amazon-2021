import React, { useState } from "react";
import { useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

let listUsers = [];
let listMessages = [];
let userSelected = {};

export default function SupportScreen() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const pickUser = (user) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="row top full-container">
      <div className="col-1 support-users">
        {users.length === 0 && <MessageBox>No User Need Help</MessageBox>}
        <ul>
          {users
            .filter((user) => user._id !== userInfo._id)
            .map((user, idx) => (
              <li
                key={idx}
                className={user._id === userSelected._id ? "selected" : ""}
              >
                <button
                  type="button"
                  className="block"
                  onClick={() => pickUser(user)}
                >
                  {user.name}
                </button>
                <span
                  className={
                    user.unread ? "unread" : user.online ? "online" : "offline"
                  }
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="col-3 support-messages">
        {!selectedUser?._id ? (
          <MessageBox>Pick User to Chat</MessageBox>
        ) : (
          <div>
            <div className="row">
              <strong>Chat With {selectedUser.name}</strong>
            </div>
            <ul>
              {messages.map((msg, idx) => (
                <li key={idx}>{msg.body}</li>
              ))}
            </ul>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Message"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <button
                    disabled={messageInput === "" ? true : false}
                    className="form-control"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
