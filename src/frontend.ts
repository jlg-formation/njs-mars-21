import express from 'express';
import {DbServer} from './dbserver/DbServer';

function currency(price: number): string {
  return price.toFixed(2);
}

export const frontend = (db: DbServer) => {
  const app = express.Router();

  app.get('/', (req, res) => {
    (async () => {
      const articles = await db.retrieveAll();
      res.render('pages/index', {articles, currency});
    })();
  });

  return app;
};
