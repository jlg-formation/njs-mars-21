import express from "express";
import { Article } from "./interfaces/Article";

const ressource: Article[] = [
  {
    name: "Tournevis",
    price: 2.99,
    qty: 100,
  },
  {
    name: "Pince",
    price: 4.5,
    qty: 34,
  },
  {
    name: "Marteau",
    price: 8.99,
    qty: 20,
  },
];

const app = express.Router();

app.get("/", (req, res) => {
  res.json(ressource);
});

export const articles = app;
