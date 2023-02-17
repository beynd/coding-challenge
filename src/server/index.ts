import { readFileSync } from 'node:fs';
import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';

import resolvers from './resolvers';

const utf = 'utf-8';
const typeDefs = readFileSync('../../schema.graphql', utf);

const port = 4000;
createServer(
  createYoga({ schema: createSchema({ typeDefs, resolvers }) }),
).listen(port);
console.log('Started on', port);
