import express from 'express';
import {DbServer} from './dbserver/DbServer';

export const frontend = (db: DbServer) => {
  const app = express.Router();

  app.get('/', (req, res) => {
    res.render('pages/index', {articles: [{name: 'toto'}, {name: 'titi'}]});
  });

  return app;
};
