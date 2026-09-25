import { db } from './database.js';

/**
 * Implementación optimizada mediante DataLoader.
 *
 * Apollo entrega el tercer argumento de cada resolver como contexto. El
 * loader agrupa, durante el mismo ciclo del event loop, todos los IDs que
 * solicitan los resolvers de `Cliente.facturas`.
 */
export const resolversOptimizados = {
    Query: {
        clientes: () => db.fetchAllClientes(),
    },
    Cliente: {
        facturas: (cliente, _argumentos, { facturasPorClienteLoader }) =>
            facturasPorClienteLoader.load(cliente.id),
    },
};

export default resolversOptimizados;
