import { db } from './database.js';

/**
 * Implementación deliberadamente ingenua.
 *
 * Una consulta a `clientes` realiza una lectura inicial y el resolver de
 * `Cliente.facturas` realiza otra lectura por cada cliente. Para N clientes,
 * esto produce 1 + N viajes a la capa de datos (problema N+1).
 */
export const resolversIngenuos = {
    Query: {
        clientes: () => db.fetchAllClientes(),
    },
    Cliente: {
        facturas: (cliente) => db.fetchFacturasByClienteId(cliente.id),
    },
};

export default resolversIngenuos;
