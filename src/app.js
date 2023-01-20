import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";

const app = express();

app.get("/doadores/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [rows] = await pool.query("SELECT * FROM Doadores where doadorID = ?", [
    id,
  ]);
  res.json(rows);
});

app.get("/hemocentros", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM Hemocentros");
  res.json(rows);
});

app.get("/doacoes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [rows] = await pool.query("SELECT * FROM Doacoes where doacaoID = ?", [
    id,
  ]);
  res.json(rows);
});

app.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  res.json(rows);
});

app.get("/ping", async (req, res) => {
  const [result] = await pool.query(`SELECT "hello world" as RESULT`);
  res.json(result[0]);
});

app.post("/create", async (req, res) => {
  const name = req.body;
  const result = await pool.query("INSERT INTO users(name) VALUES (?)", [name]);

  response.json(result);
});

app.listen(PORT);
console.log("Server on port", PORT);
