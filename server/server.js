const express = require('express');

// const http = require('http');
const { Server } = require('socket.io');

const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const cors = require('cors');
const bodyParser = require('body-parser');
const translateController = require('./controllers/translateController');
const userRoutes = require('./routes/userRoutes');
const chatHandler = require('./socketHandlers/chatHandler');

const app = express();

// const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3001;
require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

const startApolloServer = async () => {
  await server.start();

  app.use(cors());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(bodyParser.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();


app.use('/api', userRoutes); 
app.post('/translate', translateController.translateText);

io.on('connection', (socket) => chatHandler(io, socket));


// const startServer = async () => {
//   await apolloServer.start();
//   apolloServer.applyMiddleware({ app });
  
//   db.once('open', () => {
//     httpServer.listen(PORT, () => {  
//       console.log(`🌍 Now listening on localhost:${PORT}${apolloServer.graphqlPath}`);
//     });
//   });
// };

// startServer();
