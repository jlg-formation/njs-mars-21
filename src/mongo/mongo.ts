import {Article} from './../interfaces/Article';
import {MongoClient} from 'mongodb';

async function main() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/gestion-stock', {
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log('successfully connected...');

    // create an article
    const result = await client
      .db()
      .collection<unknown>('articles')
      .insertOne(({
        name: 'Tournevis',
        price: 2.45,
        qty: 123,
      } as unknown) as Pick<unknown, never>);
    console.log('result: ', result);
    // retrieve an article
    const articles = await client
      .db()
      .collection<Article>('articles')
      .find({})
      .toArray();
    console.log('articles: ', articles);

    // close
    await client.close();
    console.log('closed.');
  } catch (err) {
    console.log('err: ', err);
  }
}

main();
