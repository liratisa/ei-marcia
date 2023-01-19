import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";
//const sql = require("sql-template-strings");

const app = express();

app.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  res.json(rows);
});

app.get("/ping", async (req, res) => {
  const [result] = await pool.query(`SELECT "hello world" as RESULT`);
  res.json(result[0]);
});

app.post("/create", async (req, res) => {
  let name = req.body.name;
  const result = await pool.query("INSERT INTO users(name) VALUES (?)", name);

  res.status(201).json(result);
});

app.listen(PORT);
console.log("Server on port", PORT);
