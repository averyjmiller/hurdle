import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import "./messaging.css";

const Messaging = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);
    
    newSocket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });


    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      socket.emit('chat message', { user: username, text: message });
      setMessage('');
    }
  };

  return (
    <div>
      <input
        placeholder="Username"
        className="userInput"
        name="text"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <h1>Begin Conversation</h1>
      <div className="container">
        <div className="nav-bar">
          <button className="chat-toggle-button">Chat</button>
          <div className="close">
            <div className="line one"></div>
            <div className="line two"></div>
          </div>
        </div>
        <div className="messages-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${index % 2 === 0 ? 'one' : 'two'}`}>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="sender-area">
          <div className="input-place">
            <input
              placeholder="Send a message."
              className="send-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="send" onClick={handleSendMessage}>
              {/* SVG for send icon */}
              <svg className="send-icon" viewBox="0 0 512 512">
                {/* SVG content */}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
