import express from 'express';
import compression from 'compression';
import schema from './src/schema';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { createServer } from 'http';
import Database from './src/utils/db';
const { parsed: { PORT, GQL, DB } } = require('dotenv').config()

async function init() {
    const app = express();
    const pubsub = new PubSub()
    app.use(compression());

    const db = await new Database().init(DB)
    const context: any = async () => ({ db, pubsub })

    const server = new ApolloServer({ schema, introspection: !0, context, playground: !0 });

    server.applyMiddleware({ app, path: '/gql' })
    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer)
    httpServer.listen(PORT, () => console.log(GQL));
}

init();
