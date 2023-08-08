import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });

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
