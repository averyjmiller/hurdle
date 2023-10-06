import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';  

function Chat({ targetLanguage }) {  
  const [message, setMessage] = useState('');
  const [translatedMessage, setTranslatedMessage] = useState('');
  const [socket, setSocket] = useState(null);  // Create state for socket

  useEffect(() => {
    const newSocket = io('http://localhost:3001');  // Connect to Socket.IO server
    setSocket(newSocket);  // Set socket state

    newSocket.on('chat message', (msg) => {  // Listen for 'chat message' event from server
      console.log('Received message:', msg);
    });

    return () => {
      newSocket.disconnect();  // Disconnect on cleanup
    };
  }, []);

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:3001/translate', {
        text: message,
        targetLanguage,  // Use the prop to set the target language dynamically
      });

      setTranslatedMessage(response.data.translatedText);
      if (socket) {
        socket.emit('chat message', response.data.translatedText);  // Emit 'chat message' event to server
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleTranslate}>Translate</button>
      <p>Translated Message: {translatedMessage}</p>
    </div>
  );
}

export default Chat;  