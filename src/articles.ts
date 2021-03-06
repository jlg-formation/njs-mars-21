import express from 'express';

import {Article} from './interfaces/Article';
import {UserError} from './UserError';
import {DbServer} from './dbserver/DbServer';

export const articles = (db: DbServer) => {
  const app = express.Router();

  app.get('/', (req, res) => {
    (async () => {
      res.json(await db.retrieveAll());
    })();
  });

  app.get('/:myId', (req, res) => {
    (async () => {
      try {
        const id = req.params.myId;
        const article = await db.retrieve(id);
        res.json(article);
      } catch (err) {
        if (err instanceof UserError) {
          res.status(404).end();
          return;
        }
        console.log('err: ', err);
        res.status(500).end();
      }
    })();
  });

  app.delete('/:myId', (req, res) => {
    (async () => {
      try {
        const id = req.params.myId;
        await db.delete(id);
        res.status(204).end();
      } catch (err) {
        console.log('err: ', err);
        res.status(500).end();
      }
    })();
  });

  app.delete('/', (req, res) => {
    (async () => {
      try {
        await db.deleteAll();
        res.status(204).end();
      } catch (err) {
        console.log('err: ', err);
        res.status(500).end();
      }
    })();
  });

  app.use(express.json());

  app.post('/', (req, res) => {
    (async () => {
      try {
        const resource = await db.add(req.body as Article);
        res.status(201).json(resource);
      } catch (err) {
        console.log('err: ', err);
        res.status(500).end();
      }
    })();
  });

  app.put('/:myId', (req, res) => {
    (async () => {
      const id = req.params.myId;
      const resource: Article = req.body;
      try {
        await db.rewrite(id, resource);
      } catch (error) {
        if (error instanceof UserError) {
          res.status(400).send((error as Error).message);
          return;
        }
        console.log('error: ', error);
        res.status(500).end();
        return;
      }

      res.status(204).end();
    })();
  });

  app.patch('/:myId', (req, res) => {
    (async () => {
      try {
        const id = req.params.myId;
        const resource: Partial<Article> = req.body;
        await db.update(id, resource);
        res.status(204).end();
      } catch (error) {
        if (error instanceof UserError) {
          res.status(400).send((error as Error).message);
          return;
        }
        console.log('error: ', error);
        res.status(500).end();
      }
    })();
  });

  app.patch('/', (req, res) => {
    (async () => {
      try {
        const resource: Partial<Article> = req.body;
        await db.updateAll(resource);

        res.status(204).end();
      } catch (err) {
        console.log('err: ', err);
        res.status(500).end();
      }
    })();
  });
  return app;
};
