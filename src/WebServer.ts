import {resolve} from 'path';
import express, {Express} from 'express';
import {api} from './api';
import serveIndex from 'serve-index';
import {Server} from 'http';
import {MongoDbServer} from './MongoDbServer';

export class WebServer {
  app: Express;
  httpServer!: Server;
  db = new MongoDbServer(this.uri);
  constructor(private port: number, private uri: string) {
    const app = express();
    const www = resolve(process.cwd(), './public');

    app.use((req, res, next) => {
      console.log('req.url', req.url);
      next();
    });

    app.use('/api', api(this.db));

    app.use(express.static(www));
    app.use(serveIndex(www, {icons: true}));

    this.app = app;
  }

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpServer = this.app.listen(this.port, async () => {
        console.log(`Example app listening at http://localhost:${this.port}`);
        try {
          await this.db.start();
          resolve();
        } catch (err) {
          this.httpServer.close();
          reject(err);
        }
      });

      this.httpServer.on('error', err => {
        console.error('err: ', err);
        reject(err);
      });
    });
  }

  stop(): Promise<void> {
    if (!this.httpServer) {
      return Promise.resolve();
    }
    this.db.stop();
    return new Promise((resolve, reject) => {
      this.httpServer.close(err => {
        if (err) {
          reject();
          return;
        }
        resolve();
      });
    });
  }
}
