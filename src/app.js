import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";

const app = express();
app.use(express.json());

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

app.get("/hemocentros/:uf", async (req, res) => {
  const uf = req.params.uf;
  const [rows] = await pool.query("SELECT * FROM Hemocentros where uf = ?", [
    uf,
  ]);
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

app.post("/criarDoador", async (req, res) => {
  const nome = req.body.nome;
  const end = req.body.endereco;
  const num = req.body.numero;
  const bairro = req.body.bairro;
  const cep = req.body.cep;
  const cidade = req.body.cidade;
  const uf = req.body.uf;
  const tel = req.body.telefone;
  const vac = req.body.vacina;
  const cpf = req.body.cpf;
  const idade = req.body.idade;
  const tipoSanguineo = req.body.tipoSanguineo;
  const sexo = req.body.sexo;

  const result = await pool.query(
    "INSERT INTO Doadores(nome, endereco, numero, bairro, cep, cidade, uf, telefone, vacina, cpf, idade, tipoSanguineo, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?)",
    [
      nome,
      end,
      num,
      bairro,
      cep,
      cidade,
      uf,
      tel,
      vac,
      cpf,
      idade,
      tipoSanguineo,
      sexo,
    ]
  );

  res.json([result]);
});

app.listen(PORT);
console.log("Server on port", PORT);
