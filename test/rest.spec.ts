import assert from 'assert';
import fetch from 'node-fetch';
import dbg from 'debug';
import {WebServer} from '../src/WebServer';

const debug = dbg('njs:back:rest.spec.ts');

const port = +(process.env.TEST_PORT || 3333);
const uri =
  process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/gestion-stock';

describe('REST', () => {
  const server = new WebServer(port, uri);
  before(async () => {
    // start a server on port 3333
    await server.start();
  });

  after(async () => {
    // stop the server
    console.log('about to stop');
    await server.stop();
    console.log('stop with success');
  });

  it('should get all the articles', async () => {
    const response = await fetch(`http://127.0.0.1:${port}/api/articles`);
    const status = response.status;
    const articles = await response.json();
    debug('articles: ', articles);
    assert.ok(articles instanceof Array);
    assert.strictEqual(status, 200);
  });
});
