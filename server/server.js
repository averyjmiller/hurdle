const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const translateController = require('./controllers/translateController');
const userRoutes = require('./routes/userRoutes');
const chatHandler = require('./socketHandlers/chatHandler');
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

app.use('/api', userRoutes); 
app.post('/translate', translateController.translateText);

io.on('connection', (socket) => chatHandler(io, socket));

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
