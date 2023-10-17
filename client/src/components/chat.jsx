import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { LanguageContext } from '../contexts/LanguageContext';

function Chat() {
  const [message, setMessage] = useState('');
  const [translatedMessage, setTranslatedMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const preferredLanguage = useContext(LanguageContext);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('chat message', async (msg, targetLanguage) => {
      if (preferredLanguage !== targetLanguage) {
        try {
          setLoadingTranslation(true);
          const response = await axios.post('http://localhost:3001/translate', {
            text: msg,
            targetLanguage: preferredLanguage,
          });
          setTranslatedMessage(response.data.translatedText);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingTranslation(false);
        }
      } else {
        setTranslatedMessage(msg);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [preferredLanguage]);

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      socket.emit('chat message', message, preferredLanguage);
      setMessage('');
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
      <p>
        {loadingTranslation
          ? 'Translating...'
          : `Translated Message: ${translatedMessage}`}
      </p>
    </div>
  );
}

export default Chat;
