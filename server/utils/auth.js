const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');


const secret = process.env.JWT_SECRET || 'mysecretssshhhhhhh';
const expiration = '14d';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  
  authenticateToken: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token provided.' });
    }

    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token.' });
    }
  },
  
  // Optionally: Middleware to check if user is authenticated in GraphQL resolvers
  checkUserIsAuthenticated: (context) => {
    if (!context.req.user) {
      throw new GraphQLError('You must be logged in.');
    }
  }
};
