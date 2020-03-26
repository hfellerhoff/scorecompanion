import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { WorkResolver } from './resolvers/WorkResolver';
// import { updateIMSLPScores } from './cron-jobs/imslp/UpdateIMSLPScores';

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development'
  );
  await createConnection({ ...options, name: 'default' });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [WorkResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql.`);
    // console.log('Fetching scores from IMSLP...');
    // updateIMSLPScores();
  });
})();
