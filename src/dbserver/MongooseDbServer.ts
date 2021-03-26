import {MongoClient, ObjectId} from 'mongodb';
import mongoose, {Schema} from 'mongoose';

import {Article} from '../interfaces/Article';
import {MongooseResource} from '../interfaces/MongooseResource';
import {UserError} from '../UserError';
import {DbServer} from './DbServer';

function correctId(resource: MongooseResource) {
  delete resource.__v;
  resource.id = resource._id;
  delete resource._id;
}

const ArticleModel = mongoose.model(
  'Article',
  new Schema({
    name: String,
    price: {
      type: Number,
      get: (v: number) => Math.round(v * 100) / 100,
      set: (v: number) => Math.round(v * 100) / 100,
    },
    qty: {
      type: Number,
      get: (v: number) => Math.round(v),
      set: (v: number) => Math.round(v),
    },
  })
);

export class MongooseDbServer extends DbServer {
  client!: MongoClient;

  constructor(private uri: string) {
    super();
    this.client = new MongoClient(uri, {
      useUnifiedTopology: true,
    });
  }

  async start() {
    await mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('successfully connected to Mongo with Mongoose...');
  }

  async stop() {
    await this.client.close();
    console.log('MongoDB connexion: closed.');
  }

  async retrieve(id: string): Promise<Article> {
    if (!ObjectId.isValid(id)) {
      throw new UserError('id not valid');
    }
    const result = await ArticleModel.findById(id).exec();
    if (result === null) {
      throw new UserError('not exist');
    }
    const r = result.toObject();
    correctId(r as MongooseResource);
    return (r as unknown) as Article;
  }

  async retrieveAll() {
    const result = await ArticleModel.find({}).exec();
    const r = result.map(re => {
      const obj = re.toObject();
      correctId(obj as MongooseResource);
      return obj;
    });

    return (r as unknown) as Article[];
  }

  async add(resource: Article): Promise<Article> {
    const res = new ArticleModel(resource);
    const result = await res.save();
    const r = result.toObject();
    correctId(r as MongooseResource);
    return (r as unknown) as Article;
  }

  async delete(id: string): Promise<void> {
    if (!ObjectId.isValid(id)) {
      return;
    }
    await ArticleModel.findByIdAndDelete(id).exec();
  }

  async deleteAll() {
    await ArticleModel.deleteMany({}).exec();
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
