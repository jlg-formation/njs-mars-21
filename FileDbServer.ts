import { getNewId } from "./id";
import { Article } from "./interfaces/Article";
export class FileDbServer {
  resources: Article[] = [
    {
      id: "a1",
      name: "Tournevis",
      price: 2.99,
      qty: 100,
    },
    {
      id: "a2",
      name: "Pince",
      price: 4.5,
      qty: 34,
    },
    {
      id: "a3",
      name: "Marteau",
      price: 8.99,
      qty: 20,
    },
  ];

  save() {
    // save to file
  }

  add(resource: Article): Article {
    resource.id = getNewId();
    this.resources.push(resource);
    this.save();
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
