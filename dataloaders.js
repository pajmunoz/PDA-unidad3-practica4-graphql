import DataLoader from 'dataloader';
import { db } from './database.js';

/**
 * Batch Function de DataLoader.
 *
 * Debe devolver un resultado por cada llave, en el mismo orden de entrada.
 * Por ello, la capa de datos retorna un arreglo de facturas por cliente,
 * incluyendo un arreglo vacío cuando un cliente no posee facturas.
 */
export async function cargarFacturasPorCliente(clienteIds) {
    const ids = [...clienteIds];
    const facturasAgrupadas = await db.fetchFacturasByClienteIdsBatch(ids);

    if (facturasAgrupadas.length !== ids.length) {
        throw new Error('La función batch debe devolver un resultado por cada cliente.');
    }

    return facturasAgrupadas;
}

/**
 * Crea loaders aislados para una única petición GraphQL.
 * No debe compartirse esta instancia globalmente entre usuarios.
 */
export function crearDataLoaders() {
    return {
        facturasPorClienteLoader: new DataLoader(cargarFacturasPorCliente),
    };
}
