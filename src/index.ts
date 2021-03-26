import {WebServer} from './WebServer';

const port = +(process.env.PORT || 3333);

const webserver = new WebServer(
  port,
  'mongodb://localhost:27017/gestion-stock'
);
webserver.start();
