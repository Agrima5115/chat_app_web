import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      try {
        const response = await axios.post('http://localhost:5001/messages', { text: input });
        const botMessage = { text: response.data.reply, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
      setInput('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
