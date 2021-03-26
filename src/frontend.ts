import express from 'express';
import {DbServer} from './dbserver/DbServer';

export const frontend = (db: DbServer) => {
  const app = express.Router();

  app.get('/', (req, res) => {
    (async () => {
      const articles = await db.retrieveAll();
      res.render('pages/index', {articles: articles});
    })();
  });

  return app;
};
