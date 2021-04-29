import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import socketIOClient from "socket.io-client";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

let listUsers = [];
let listMessages = [];
let allUserSelected = {};

export default function SupportScreen() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messageRef = useRef();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollBy({
        top: messageRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }

    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);

      sk.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });

      sk.on("user-status", (userStatus) => {
        const existUser = listUsers.find((x) => x._id === userStatus._id);
        if (existUser) {
          listUsers = listUsers.map((user) =>
            user._id === existUser._id ? userStatus : user
          );
          setUsers(listUsers);
        } else {
          listUsers = [...listUsers, userStatus];
          setUsers(listUsers);
        }
      });

      sk.on("receive-message", (message) => {
        if (allUserSelected._id === message._id) {
          listMessages = [...listMessages, message];
        } else {
          const existUser = listUsers.find((user) => user._id === message._id);
          if (existUser) {
            listUsers = listUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(listUsers);
          }
        }
        setMessages(listMessages);
      });

      sk.on("list-users", (users) => {
        listUsers = users;
        setUsers(listUsers);
      });

      sk.on("user-select", (user) => {
        listMessages = user.messages;
        setMessages(listMessages);
      });
    }
  }, [socket, userInfo, users, messages]);

  const pickUser = (user) => {
    allUserSelected = user;
    setSelectedUser(allUserSelected);
    const existUser = listUsers.find((x) => x._id === user._id);
    if (existUser) {
      listUsers.map((user) =>
        user._id === existUser._id ? { ...user, unread: false } : user
      );
      setUsers(listUsers);
    }
    socket.emit("onUserSelect", user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    listMessages = [
      ...listMessages,
      { body: messageInput, name: userInfo.name, isAdmin: userInfo.isAdmin },
    ];
    setMessages(listMessages);
    setMessageInput("");
    socket.emit("send-message", {
      body: messageInput,
      name: userInfo.name,
      isAdmin: userInfo.isAdmin,
      _id: selectedUser._id,
    });
  };

  return (
    <div className="row top full-container">
      <div className="col-1 support-users">
        {users.filter((x) => x._id !== userInfo._id).length === 0 && (
          <MessageBox>No User Need Help</MessageBox>
        )}
        <ul>
          {users
            .filter((user) => user._id !== userInfo._id)
            .map((user, idx) => (
              <li
                key={idx}
                className={user._id === allUserSelected._id ? "selected" : ""}
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
            <ul ref={messageRef}>
              {messages.map((msg, idx) => (
                <li key={idx} className={msg.isAdmin ? "admin" : "user"}>
                  <div className="chat-bubble">{msg.body}</div>
                </li>
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
