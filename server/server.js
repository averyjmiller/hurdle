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
const app = express();
const httpServer = http.createServer(app);  // Create HTTP server
const io = new Server(httpServer);  // Set up Socket.IO server
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
app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: `Translate the following English text to ${targetLanguage}: ${text}`,
      max_tokens: 60,
      temperature: 0,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },      
    });

    const translatedText = response.data.choices[0].text.trim();
    res.send({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to translate the message' });
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
} 

// Start the Apollo Server and apply middleware
const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  
  db.once('open', () => {
    httpServer.listen(PORT, () => {  // Ensure Socket.IO is using the HTTP server
      console.log(`🌍 Now listening on localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  });
};

startServer();
