import { FileDbServer } from "./FileDbServer";
import express from "express";
import { Article } from "./interfaces/Article";

const db = new FileDbServer();

const app = express.Router();

app.get("/", (req, res) => {
  res.json(db.resources);
});

app.get("/:myId", (req, res) => {
  const id = req.params.myId;
  const article = db.resources.find((a) => a.id === id);
  res.json(article);
});

app.delete("/:myId", (req, res) => {
  (async () => {
    try {
      const id = req.params.myId;
      await db.delete(id);
      res.status(204).end();
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

app.delete("/", (req, res) => {
  db.deleteAll();
  res.status(204).end();
});

app.use(express.json());

app.post("/", (req, res) => {
  (async () => {
    try {
      const resource = await db.add(req.body as Article);
      res.status(201).json(resource);
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

app.put("/:myId", (req, res) => {
  const id = req.params.myId;
  const resource: Article = req.body;
  try {
    db.rewrite(id, resource);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }

  res.status(204).end();
});

app.patch("/:myId", (req, res) => {
  const id = req.params.myId;
  const resource: Partial<Article> = req.body;
  try {
    db.update(id, resource);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }

  res.status(204).end();
});

app.patch("/", (req, res) => {
  const resource: Partial<Article> = req.body;
  db.updateAll(resource);

  res.status(204).end();
});

export const articles = app;
