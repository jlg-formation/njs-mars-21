import express from "express";
import { getNewId } from "./id";
import { Article } from "./interfaces/Article";

const resources: Article[] = [
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

const app = express.Router();

app.get("/", (req, res) => {
  res.json(resources);
});

app.get("/:myId", (req, res) => {
  const id = req.params.myId;
  const article = resources.find((a) => a.id === id);
  res.json(article);
});

app.use(express.json());

app.post("/", (req, res) => {
  const resource: Article = req.body;
  resource.id = getNewId();
  // DDOS filtering
  // monitoring
  // authentification
  // validate resource
  // sanitize resource
  resources.push(resource);
  res.status(201).json(resource);
});

app.put("/:myId", (req, res) => {
  const id = req.params.myId;
  const resource: Article = req.body;
  resource.id = id;
  const index = resources.findIndex((re) => re.id === id);
  if (index === -1) {
    res.status(400).send("object not existing");
    return;
  }
  resources.splice(index, 1, resource);
  res.status(204).end();
});

app.patch("/:myId", (req, res) => {
  const id = req.params.myId;
  const resource: Partial<Article> = req.body;
  const existingResource = resources.find((re) => re.id === id);
  if (existingResource === undefined) {
    res.status(400).send("object not existing");
    return;
  }
  Object.assign(existingResource, resource);
  res.status(204).end();
});

export const articles = app;
