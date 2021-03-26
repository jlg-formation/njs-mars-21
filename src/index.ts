import {WebServer} from './WebServer';

const port = +(process.env.PORT || 3333);
const uri = process.env.URI || 'mongodb://localhost:27017/gestion-stock';

const webserver = new WebServer(port, uri);
webserver.start();
