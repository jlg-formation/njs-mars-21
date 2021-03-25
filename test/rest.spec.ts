import assert from 'assert';
import fetch from 'node-fetch';
import dbg from 'debug';
import {WebServer} from '../src/WebServer';

const debug = dbg('njs:back:rest.spec.ts');

const port = +(process.env.TEST_PORT || 3333);
const mongoUri =
  process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/gestion-stock';

const url = `http://localhost:${port}/api/articles`;

describe('REST', () => {
  const server = new WebServer(port, mongoUri);
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

  it('should remove all the articles', async () => {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const status = response.status;
    assert.strictEqual(status, 204);

    const response2 = await fetch(url);
    const articles = await response2.json();
    assert.strictEqual(articles.length, 0);
  });
  it('should create an article', async () => {
    const article = {
      name: 'Tournevis',
      price: 2.55,
      qty: 10,
    };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {'Content-Type': 'application/json'},
    });
    const status = response.status;
    assert.strictEqual(status, 201);
    const createdArticle = await response.json();
    console.log('createdArticle: ', createdArticle);
    assert.ok(createdArticle.id);

    const response2 = await fetch(url);
    const articles = await response2.json();
    assert.strictEqual(articles.length, 1);
  });
  it('should create another article', async () => {});
  it('should get all the articles', async () => {
    const response = await fetch(url);
    const status = response.status;
    const articles = await response.json();
    debug('articles: ', articles);
    assert.ok(articles instanceof Array);
    assert.strictEqual(status, 200);
    assert.strictEqual(articles.length, 1);
  });
  it('should rewrite the first article', async () => {});
  it('should update the first article', async () => {});
  it('should update all the article', async () => {});
  it('should delete one article', async () => {});
});
