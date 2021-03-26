import express from 'express';
import {DbServer} from './dbserver/DbServer';
import {Article} from './interfaces/Article';

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

  app.get('/details/:id', (req, res) => {
    const id = req.params.id;
    (async () => {
      try {
        const article = await db.retrieve(id);
        res.render('pages/detail', {article, currency});
      } catch (err) {
        res.status(404).end();
      }
    })();
  });

  app.get('/add', (req, res) => {
    res.render('pages/add', {});
  });

  app.use(express.urlencoded({extended: true}));

  app.post('/action/add-article', (req, res) => {
    (async () => {
      try {
        const article = req.body as Article;
        console.log('article: ', article);
        if (article.name === '') {
          throw new Error('cannot insert an article with no name');
        }
        await db.add(article);
        res.redirect('/');
      } catch (err) {
        res.redirect('/error');
      }
    })();
  });

  app.get('/error', (req, res) => {
    res.render('pages/error', {});
  });

  return app;
};
