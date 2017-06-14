import Hapi from 'hapi';
import routes from './routes';
import db from './db';

const server = new Hapi.Server();

const createServer = () => {
    server.connection({
        port: process.env.PORT || 3000,
        routes: { cors: true }
    });
    server.register(require('inert'), err => {

        db({}, () => {
            server.route(routes);
            server.start(err => {
                if (err) throw err;
                console.log(`Server running at port ${server.info.port}`);
            });
        });
    });
};

export default createServer;
