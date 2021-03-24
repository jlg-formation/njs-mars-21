import { UserError } from "./UserError";
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

  async retrieve(id: string): Promise<Article> {
    const resource = this.resources.find((a) => a.id === id);
    if (!resource) {
      throw new UserError("cannot find resource");
    }
    return resource;
  }

  async retrieveAll() {
    return this.resources;
  }

  async add(resource: Article): Promise<Article> {
    resource.id = getNewId();
    this.resources.push(resource);
    await this.save();
    return resource;
  }

  async delete(id: string): Promise<void> {
    const index = this.resources.findIndex((re) => re.id === id);
    if (index === -1) {
      return;
    }
    this.resources.splice(index, 1);
    await this.save();
  }

  async deleteAll() {
    this.resources.length = 0;
    await this.save();
  }

  async rewrite(id: string, resource: Article) {
    resource.id = id;
    const index = this.resources.findIndex((re) => re.id === id);
    if (index === -1) {
      throw new UserError("object not existing");
    }
    this.resources.splice(index, 1, resource);
    await this.save();
  }

  async update(id: string, resource: Partial<Article>) {
    const existingResource = this.resources.find((re) => re.id === id);
    if (existingResource === undefined) {
      throw new UserError("object not existing");
    }
    Object.assign(existingResource, resource);
    await this.save();
  }

  async updateAll(resource: Partial<Article>) {
    for (const re of this.resources) {
      Object.assign(re, resource);
    }
    // this.resources.forEach((re) => {
    //   Object.assign(re, resource);
    // });
    await this.save();
  }
}
