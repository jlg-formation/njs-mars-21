import express from "express";
import { Article } from "./interfaces/Article";

const ressource: Article[] = [
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
  res.json(ressource);
});

app.get("/:myId", (req, res) => {
  const id = req.params.myId;
  const article = ressource.find((a) => a.id === id);
  res.json(article);
});

export const articles = app;
