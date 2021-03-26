import {MongoClient, ObjectId} from 'mongodb';

import {Article} from '../interfaces/Article';
import {MongoResource} from '../interfaces/MongoResource';
import {DbServer} from './DbServer';

function correctId(resource: MongoResource) {
  resource.id = resource._id;
  delete resource._id;
}

export class MongooseDbServer extends DbServer {
  client!: MongoClient;

  constructor(private uri: string) {
    super();
    this.client = new MongoClient(uri, {
      useUnifiedTopology: true,
    });
  }

  async start() {
    await this.client.connect();
    console.log('successfully connected to Mongo with Mongoose...');
  }

  async stop() {
    await this.client.close();
    console.log('MongoDB connexion: closed.');
  }

  async retrieve(id: string): Promise<Article> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resource: any = await this.client
      .db()
      .collection<unknown>('articles')
      .findOne({_id: new ObjectId(id)});
    correctId(resource);
    return resource as Article;
  }

  async retrieveAll() {
    const resources = await this.client
      .db()
      .collection<Article>('articles')
      .find({})
      .toArray();
    return resources.map(r => {
      correctId(r);
      return r;
    });
  }

  async add(resource: Article): Promise<Article> {
    const result = await this.client
      .db()
      .collection<unknown>('articles')
      .insertOne((resource as unknown) as Pick<unknown, never>);
    correctId((result.ops[0] as unknown) as MongoResource);
    return (result.ops[0] as unknown) as Article;
  }

  async delete(id: string): Promise<void> {
    await this.client
      .db()
      .collection<unknown>('articles')
      .deleteOne({_id: new ObjectId(id)});
  }

  async deleteAll() {
    await this.client.db().collection<unknown>('articles').deleteMany({});
  }

  async rewrite(id: string, resource: Article) {
    await this.client
      .db()
      .collection<unknown>('articles')
      .replaceOne({_id: new ObjectId(id)}, resource);
  }

  async update(id: string, resource: Partial<Article>) {
    await this.client
      .db()
      .collection<unknown>('articles')
      .updateOne(
        {_id: new ObjectId(id)},
        {
          $set: resource,
        },
        {upsert: true}
      );
  }

  async updateAll(resource: Partial<Article>) {
    await this.client.db().collection<unknown>('articles').updateMany(
      {},
      {
        $set: resource,
      },
      {upsert: true}
    );
  }
}
