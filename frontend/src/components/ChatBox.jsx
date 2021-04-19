import React, { useState } from "react";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const handleOpenSocket = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <ul>
            {messages.map((msg, idx) => (
              <li key={idx}>
                <p>{msg.body}</p>
                <small>{msg.name}</small>
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
                <button className="form-control" type="submit">
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
