import {Article} from '../interfaces/Article';
export abstract class DbServer {
  abstract retrieveAll(): Promise<Article[]>;

  abstract retrieve(id: string): Promise<Article>;

  abstract delete(id: string): Promise<void>;

  abstract deleteAll(): Promise<void>;

  abstract add(a: Article): Promise<Article>;

  abstract rewrite(id: string, resource: Article): Promise<void>;

  abstract updateAll(resource: Partial<Article>): Promise<void>;

  abstract update(id: string, resource: Partial<Article>): Promise<void>;

  abstract start(): Promise<void>;

  abstract stop(): Promise<void>;
}
