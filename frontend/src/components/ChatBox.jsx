import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

export default function ChatBox({ userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollBy({
        top: messageRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket && userInfo) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });

      socket.on("receive-message", (message) => {
        setMessages([...messages, { body: message.body, name: message.name }]);
      });
    }
  }, [userInfo, socket, messages]);

  const handleOpenSocket = () => {
    setIsOpen(true);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, { body: messageInput, name: userInfo.name }]);
    socket.emit("send-message", {
      body: messageInput,
      name: userInfo.name,
      isAdmin: userInfo.isAdmin,
      _id: userInfo._id,
    });
    setMessageInput("");
  };

  return (
    <div className="chatbox">
      {!isOpen ? (
        <button type="button" onClick={handleOpenSocket}>
          <i className="fa fa-support"></i>
        </button>
      ) : (
        <div className="card card-body">
          <div className="row">
            <strong>Support</strong>
            <button type="button" onClick={() => setIsOpen(false)}>
              <i className="fa fa-close"></i>
            </button>
          </div>
          <ul ref={messageRef}>
            {messages.map((msg, idx) => (
              <li key={idx} className={!msg.isAdmin ? "user" : "admin"}>
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
  );
}
