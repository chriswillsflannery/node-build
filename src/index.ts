import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import morgan from 'morgan';
import { schema, resolvers } from './graphql';
import { db, seedDatabase } from './modules/db';

interface MyContext {
  token?: string;
}

const main = async () => {
  seedDatabase();
  const app = express();
  const httpServer = http.createServer(app);
  app.use(morgan('dev'));

  app.get('/', async (req, res) => {
    const submissions = await db.submission.findMany();
    res.json(submissions);
  });

  const server = new ApolloServer<MyContext>({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  const port = Number(process.env.PORT ?? 8080);
  await new Promise<void>((resolve) => httpServer.listen({ port, host: '0.0.0.0' }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`, 'enjoy');
}

main();

