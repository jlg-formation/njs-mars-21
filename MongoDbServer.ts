import { MongoClient, ObjectId } from "mongodb";

import { UserError } from "./UserError";
import { Article } from "./interfaces/Article";

const URI = "mongodb://localhost:27017/gestion-client";

export class MongoDbServer {
  client: MongoClient;

  constructor() {
    (async () => {
      try {
        this.client = new MongoClient(
          "mongodb://localhost:27017/gestion-stock",
          {
            useUnifiedTopology: true,
          }
        );
        await this.client.connect();
        console.log("successfully connected to Mongo...");
      } catch (err) {
        console.error("err: ", err);
        process.exit(1);
      }
    })();
  }

  async retrieve(id: string): Promise<Article> {
    const resource = await this.client
      .db()
      .collection<any>("articles")
      .findOne({ _id: new ObjectId(id) });
    return resource as Article;
  }

  async retrieveAll() {
    const resources = await this.client
      .db()
      .collection<Article>("articles")
      .find({})
      .toArray();
    return resources.map((r) => {
      r.id = r._id;
      delete r._id;
      return r;
    });
  }

  async add(resource: Article): Promise<Article> {
    const result = await this.client
      .db()
      .collection<any>("articles")
      .insertOne(resource);

    return result.ops[0] as Article;
  }

  async delete(id: string): Promise<void> {
    await this.client
      .db()
      .collection<any>("articles")
      .deleteOne({ _id: new ObjectId(id) });
  }

  async deleteAll() {
    await this.client.db().collection<any>("articles").deleteMany({});
  }

  async rewrite(id: string, resource: Article) {
    await this.client
      .db()
      .collection<any>("articles")
      .replaceOne({ _id: new ObjectId(id) }, resource);
  }

  async update(id: string, resource: Partial<Article>) {
    await this.client
      .db()
      .collection<any>("articles")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: resource,
        },
        { upsert: true }
      );
  }

  async updateAll(resource: Partial<Article>) {
    await this.client.db().collection<any>("articles").updateMany(
      {},
      {
        $set: resource,
      },
      { upsert: true }
    );
  }
}
