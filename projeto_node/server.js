import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());   // nessessario para o express reconhecer o json.

var todos = [];

app.get("/todos", (req, res) => {
  //busca todos
  res.status(200).json({ todos });
})

app.post("/todos", (req, res) => {
  const { body } = req;
  const todo = body;

  todo.concluded = false;
  todo.id = uuidv4();
  todo.date = new Date();

  todos.push(todo);

  res.status(201).send({ todo })   //201 status de postagem
})

app.put("/todos", (req, res) => {
  const { id } = req.headers;
  let { title, description, concluded } = req.query;

  concluded === "true" ? concluded = true : concluded = false;

  const todo = todos.find(todo => todo.id === id);

  // se nao fizer esses comandos ele retornara todos os dados.
  todo.title = title ? title : todo.title;  
  todo.description = description ? description : todo.description;
  todo.concluded = concluded ? concluded : todo.concluded;
  

  res.status(202).send()     //202 status de atualização
})

app.delete("/todos", (req, res) => {
  const { id } = req.headers;
  const index = todos.indexOf(todo => todo.id === id);

  todos.splice(index, 1);

  res.status(202).send()     //202 status de delete
})

app.listen(3333, () => console.log("server running in localhost:3333"));