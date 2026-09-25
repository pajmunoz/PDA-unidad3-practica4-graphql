import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile } from 'node:fs/promises';
import { crearDataLoaders } from './dataloaders.js';
import { resolversOptimizados } from './resolvers-optimizados.js';
import {resolversIngenuos} from './resolvers-ingenuos.js';

const typeDefs = await readFile(new URL('./schema.graphql', import.meta.url), 'utf8');

const server = new ApolloServer({
    typeDefs,
    resolvers: resolversOptimizados,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    // Se crea un caché independiente por cada petición HTTP.
    context: async () => crearDataLoaders(),
});

console.log(`🚀 Servidor académico listo en: ${url}`);
