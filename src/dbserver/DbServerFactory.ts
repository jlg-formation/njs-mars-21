import {FileDbServer} from './FileDbServer';
import {DbServer} from './DbServer';
import {MongoDbServer} from './MongoDbServer';

export class DbServerFactory {
  static create(uri: string): DbServer {
    if (uri.startsWith('mongo')) {
      return new MongoDbServer(uri);
    }
    return new FileDbServer();
  }
}
