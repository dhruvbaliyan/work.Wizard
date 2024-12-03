import React, { useState } from "react";
import "./chatbot.scss";

import img1 from './../chatBot/chatbox-icon.svg'
const Chatbot = () => {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const toggleChatbox = () => {
    setIsActive(!isActive);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { name: "User", message: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate API call
    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: JSON.stringify({ message: inputValue }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const botMessage = { name: "Sam", message: data.answer };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => console.error("Error:", error));

    setInputValue("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbox">
      {/* Chatbox Button */}
      <div className="chatbox__button">
        <button onClick={toggleChatbox}>
          <img src={img1} alt="Chat Icon" />
        </button>
      </div>

      {/* Chatbox Content */}
      <div className={`chatbox__support ${isActive ? "chatbox--active" : ""}`}>
        <div className="chatbox__header">
          <div className="chatbox__image--header">
            <img
              src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
              alt="User"
            />
          </div>
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">Chat support</h4>
            <p className="chatbox__description--header">
              Hi. My name is Sam. How can I help you?
            </p>
          </div>
        </div>
        <div className="chatbox__messages">
          {messages.slice().reverse().map((msg, index) => (
            <div
              key={index}
              className={`messages__item ${
                msg.name === "Sam"
                  ? "messages__item--visitor"
                  : "messages__item--operator"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <div className="chatbox__footer">
          <input
            type="text"
            placeholder="Write a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="chatbox__send--footer send__button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;