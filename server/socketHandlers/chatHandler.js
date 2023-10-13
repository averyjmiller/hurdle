const axios = require('axios');
const userLanguages = {};

module.exports = (io, socket) => {
  console.log('a user connected');
  
  socket.on('set language', (language) => {
    userLanguages[socket.id] = language;
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete userLanguages[socket.id];
  });
  
  socket.on('chat message', async (msg) => {
    const targetLanguage = userLanguages[socket.id] || 'English';
    try {
      const response = await axios.post('http://localhost:3001/translate', {
        text: msg,
        targetLanguage,
      });
      const translatedMessage = response.data.translatedText;
      io.emit('chat message', translatedMessage);
    } catch (error) {
      console.error('Translation error:', error);
    }
  });
};
