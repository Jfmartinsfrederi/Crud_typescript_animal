import fastify from 'fastify';
import { routes } from '../routes/routes.js';
const server = fastify();
const start = async () => {
    await routes(server);
    await server.listen({ port: 8080 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
};
start();
//# sourceMappingURL=index.js.map