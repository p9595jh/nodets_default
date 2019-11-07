import app from '../app'
import * as http from 'http';
const debug = require('debug')('nodets:server');

const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

server.listen(3000);
server.on('error', onError);
server.on('listening', onListening);
 

// function declarations
function normalizePort(val: string) {
    let port = parseInt(val, 10);
    if ( isNaN(port) ) return val;
    if ( port >= 0 ) return port;
    return false;
}

function onError(error: any) {
    if ( error.syscall !== 'listen' ) {
        throw error;
    }

    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = server.address();
    if ( !addr ) {
        console.log('server address is not defined');
        return;
    }
    let bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
