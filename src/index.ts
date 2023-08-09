import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';
import * as dotenv from 'dotenv';
import { verifyToken } from './helpers/auth.helpers';
import User from './models/User';
import { IContext, IContextRequest } from './types/context';

const app = express();

dotenv.config();

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: IContextRequest): Promise<IContext> => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return { error: 'No authorization token provided' };
      }

      const token = authorization.replace('Bearer ', '');

      const jwtPayload = await verifyToken(token, process.env.JWT_SECRET);

      if (!jwtPayload.valid) {
        return { error: 'Invalid or expired token' };
      }

      const { sub } = jwtPayload.decoded;

      const user = await User.findById(sub);

      if (!user) {
        return { error: 'Invalid token' };
      }
      return { user };
    } catch (error) {
      return { error: error.message || 'An error occurred' };
    }
  },
  introspection: true,
  persistedQueries: false,
});
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/webxwiz';

if (!mongoURI) {
  throw new Error('MongoDB URI not provided in the environment variables.');
}

console.log('Connecting to MongoDB...');

mongoose
  .connect(mongoURI, {})
  .then(async () => {
    console.log('Database connected');

    await server.start(); // Start Apollo Server

    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });
