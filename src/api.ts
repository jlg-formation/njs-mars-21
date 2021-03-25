import {MongoDbServer} from './MongoDbServer';
import express from 'express';
import {articles} from './articles';

export const api = (db: MongoDbServer) => {
  const app = express.Router();

  app.get('/date', (req, res) => {
    res.json({date: new Date()});
  });

  app.use('/articles', articles(db));
  return app;
};
