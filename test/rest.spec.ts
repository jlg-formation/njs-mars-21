import assert from 'assert';
import fetch from 'node-fetch';
import dbg from 'debug';
import {WebServer} from '../src/WebServer';

const debug = dbg('njs:back:rest.spec.ts');

const port = +(process.env.TEST_PORT || 3333);
const mongoUri =
  process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/gestion-stock';

const url = `http://localhost:${port}/api/articles`;

console.log = () => {};

describe('REST', () => {
  const server = new WebServer(port, mongoUri);

  let id1: string;
  let id2: string;

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
    id1 = createdArticle.id;
    assert.ok(createdArticle.id);

    const response2 = await fetch(url);
    const articles = await response2.json();
    assert.strictEqual(articles.length, 1);
  });
  it('should create another article', async () => {
    const article = {
      name: 'Marteau',
      price: 4.99,
      qty: 13,
    };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {'Content-Type': 'application/json'},
    });
    const status = response.status;
    assert.strictEqual(status, 201);
    const createdArticle = await response.json();
    id2 = createdArticle.id;
    assert.ok(createdArticle.id);

    const response2 = await fetch(url);
    const articles = await response2.json();
    assert.strictEqual(articles.length, 2);
  });
  it('should get all the articles', async () => {
    const response = await fetch(url);
    const status = response.status;
    const articles = await response.json();
    debug('articles: ', articles);
    assert.ok(articles instanceof Array);
    assert.strictEqual(status, 200);
    assert.strictEqual(articles.length, 2);
  });
  it('should rewrite the first article', async () => {
    const newArticle = {
      id: id1,
      name: 'Tournevis cruciforme',
      price: 3.66,
      qty: 5,
    };
    const response = await fetch(url + '/' + id1, {
      method: 'PUT',
      body: JSON.stringify(newArticle),
      headers: {'Content-Type': 'application/json'},
    });
    const status = response.status;
    assert.strictEqual(status, 204);

    const response2 = await fetch(url + '/' + id1);
    const article = await response2.json();
    assert.deepStrictEqual(newArticle, article);
  });
  it('should update the second article', async () => {
    const patchedArticle = {
      name: 'Joli Marteau',
    };
    const response = await fetch(url + '/' + id2, {
      method: 'PATCH',
      body: JSON.stringify(patchedArticle),
      headers: {'Content-Type': 'application/json'},
    });
    const status = response.status;
    assert.strictEqual(status, 204);

    const response2 = await fetch(url + '/' + id2);
    const article = await response2.json();
    assert.deepStrictEqual(
      {
        id: id2,
        price: 4.99,
        qty: 13,
        ...patchedArticle,
      },
      article
    );
  });
  it('should update all the article', async () => {
    const patchedArticle = {
      price: 5.0,
    };
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(patchedArticle),
      headers: {'Content-Type': 'application/json'},
    });
    const status = response.status;
    assert.strictEqual(status, 204);

    const response2 = await fetch(url);
    const articles = await response2.json();
    for (const a of articles) {
      assert.strictEqual(a.price, patchedArticle.price);
    }
  });
  it('should delete one article', async () => {
    const response = await fetch(url + '/' + id2, {
      method: 'DELETE',
    });
    const status = response.status;
    assert.strictEqual(status, 204);

    const response2 = await fetch(url);
    const articles = await response2.json();
    assert.strictEqual(articles.length, 1);
  });
});
