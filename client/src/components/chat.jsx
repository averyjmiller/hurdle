import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';  
// Assume LanguageContext provides the preferred language of the current user
import { LanguageContext } from '../contexts/LanguageContext';  

function Chat() {  
  const [message, setMessage] = useState('');
  const [translatedMessage, setTranslatedMessage] = useState('');
  const [socket, setSocket] = useState(null);  // Create state for socket
  const preferredLanguage = useContext(LanguageContext);  // Get the preferred language

  useEffect(() => {
    const newSocket = io('http://localhost:3001');  // Connect to Socket.IO server
    setSocket(newSocket);  // Set socket state

    newSocket.on('chat message', async (msg, targetLanguage) => {  
      if (preferredLanguage !== targetLanguage) {
        // Translate the message if the target language is different from the preferred language
        try {
          const response = await axios.post('http://localhost:3001/translate', {
            text: msg,
            targetLanguage: preferredLanguage,
          });
          setTranslatedMessage(response.data.translatedText);
        } catch (error) {
          console.error(error);
        }
      } else {
        setTranslatedMessage(msg);
      }
    });

    return () => {
      newSocket.disconnect();  // Disconnect on cleanup
    };
  }, [preferredLanguage]);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('chat message', message, preferredLanguage);  // Emit 'chat message' event to server
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
      <p>Translated Message: {translatedMessage}</p>
    </div>
  );
}

export default Chat;
