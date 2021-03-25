import assert from 'assert';
import fetch from 'node-fetch';
import dbg from 'debug';

const debug = dbg('njs:back:rest.spec.ts');

describe('REST', () => {
  it('should get all the articles', async () => {
    const response = await fetch('http://127.0.0.1:3000/api/articles');
    const status = response.status;
    const articles = await response.json();
    debug('articles: ', articles);
    assert.ok(articles instanceof Array);
    assert.strictEqual(status, 200);
  });
});
