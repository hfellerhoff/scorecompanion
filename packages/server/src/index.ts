import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { WorkResolver } from './resolvers/WorkResolver';
import { updateIMSLPScores } from './cron-jobs/imslp/UpdateIMSLPScores';
import { Work } from './entity/Work';
import { Score } from './entity/Score';
import { CountResolver } from './resolvers/CountResolver';
import path from 'path';

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development'
  );

  process.env.NODE_ENV === 'production'
    ? await createConnection({
        ...options,
        url: process.env.DATABASE_URL,
        entities: [Work, Score],
        name: 'default',
      } as any)
    : await createConnection({ ...options, name: 'default' });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [WorkResolver, CountResolver],
      validate: true,
    }),
    introspection: true,
    playground: true,
    context: ({ req, res }) => ({ req, res }),
  });

  app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log(path.join(__dirname + '/index.html'));
  });

  apolloServer.applyMiddleware({ app, cors: true });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql .`);
    console.log('Fetching scores from IMSLP...');
    updateIMSLPScores();
  });
})();
