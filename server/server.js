const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const translateController = require('./controllers/translateController');
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 3001;
require('dotenv').config();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      console.log('Connected to websocket');
    },
    onDisconnect: (webSocket) => {
      console.log('Disconnected from websocket');
    },
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Endpoint to handle message translation
app.post('/translate', translateController.translateText);

// An object to keep track of user's preferred languages by socket id
const userLanguages = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Event to set user's preferred language
  socket.on('set language', (language) => {
    userLanguages[socket.id] = language;
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete userLanguages[socket.id];  // Remove user's language preference on disconnect
  });
  
  socket.on('chat message', async (msg) => {
    const targetLanguage = userLanguages[socket.id] || 'English';  // Default to English if no preference set
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
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
}

const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  
  db.once('open', () => {
    httpServer.listen(PORT, () => {  
      console.log(`🌍 Now listening on localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  });
};

startServer();
