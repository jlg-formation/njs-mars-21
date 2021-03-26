import {FileDbServer} from './FileDbServer';
import {DbServer} from './DbServer';
import {MongoDbServer} from './MongoDbServer';
import {MongooseDbServer} from './MongooseDbServer';

export class DbServerFactory {
  static create(uri: string): DbServer {
    if (uri.startsWith('mongo')) {
      if (process.env.DB_MONGOOSE === 'mongoose') {
        return new MongooseDbServer(uri);
      }
      return new MongoDbServer(uri);
    }

    return new FileDbServer();
  }
}
