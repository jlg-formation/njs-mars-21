import {WebServer} from './WebServer';

const webserver = new WebServer(
  3000,
  'mongodb://localhost:27017/gestion-stock'
);
webserver.start();
