import { readFileSync, promises } from "fs";
import { resolve } from "path";

import { getNewId } from "./id";
import { Article } from "./interfaces/Article";

const FILENAME = resolve(process.cwd(), "./db/articles.json");

export class FileDbServer {
  resources: Article[];

  constructor() {
    try {
      this.resources = JSON.parse(
        readFileSync(FILENAME, { encoding: "utf-8" })
      );
    } catch (err) {
      console.error("err: ", err);
      process.exit(1);
    }
  }

  async save() {
    try {
      await promises.writeFile(
        FILENAME,
        JSON.stringify(this.resources, null, 2),
        {
          encoding: "utf-8",
        }
      );
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  async add(resource: Article): Promise<Article> {
    resource.id = getNewId();
    this.resources.push(resource);
    await this.save();
    return resource;
  }

  delete(id: string) {
    const index = this.resources.findIndex((re) => re.id === id);
    if (index === -1) {
      return;
    }
    this.resources.splice(index, 1);
    this.save();
  }

  deleteAll() {
    this.resources.length = 0;
    this.save();
  }

  rewrite(id: string, resource: Article) {
    resource.id = id;
    const index = this.resources.findIndex((re) => re.id === id);
    if (index === -1) {
      throw new Error("object not existing");
    }
    this.resources.splice(index, 1, resource);
    this.save();
  }

  update(id: string, resource: Partial<Article>) {
    const existingResource = this.resources.find((re) => re.id === id);
    if (existingResource === undefined) {
      throw new Error("object not existing");
    }
    Object.assign(existingResource, resource);
    this.save();
  }

  updateAll(resource: Partial<Article>) {
    for (const re of this.resources) {
      Object.assign(re, resource);
    }
    // this.resources.forEach((re) => {
    //   Object.assign(re, resource);
    // });
    this.save();
  }
}
