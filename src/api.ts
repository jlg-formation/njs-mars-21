import express from 'express';
import {articles} from './articles';
import {DbServer} from './dbserver/DbServer';

export const api = (db: DbServer) => {
  const app = express.Router();

  app.get('/date', (req, res) => {
    res.json({date: new Date()});
  });

  app.use('/articles', articles(db));
  return app;
};
