const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const dbConnect = require("./models/connection");
const cors = require("cors");
const morgan = require("morgan");
const shortid = require("shortid");

const app = express();
const PORT = process.env.PORT || 8000;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Show All Todos
app.get("/api/todos/", (req, res) => {
  let sqlQuery = "SELECT * FROM todos";
  dbConnect.query(sqlQuery, (error, results) => {
    if (error) {
      throw error;
    }
    return res.send({
      error: false,
      data: results,
      message: "SHOW ALL TODO",
    });
  });
});

// Show Single Todo
app.get("/api/todo/:id", (req, res) => {
  let todoId = req.params.id;
  let sqlQuery = "SELECT * FROM todos WHERE id = ?";
  dbConnect.query(sqlQuery, todoId, (error, results) => {
    if (error) {
      throw error;
    }
    return res.send({
      error: false,
      data: results,
      message: "SHOW TODO",
    });
  });
});

// Add New Todo
app.post("/api/todos", (req, res) => {
  // daripada logging gini mending pake logging middleware, kyk morgan
  // https://github.com/expressjs/morgan
  let todo = req.body.todo;
  let id = req.body.id;
  let sqlQuery = "INSERT INTO todos SET ?";
  dbConnect.query(sqlQuery, { id: id, todo: todo }, (error, results) => {
    if (error) console.error(error);
    res.send({
      error: false,
      data: results,
      message: "TODO CREATED",
    });
  });
});

// Update Todo Text
app.put("/api/todo/:id/text", (req, res) => {
  let updatedVal = req.body.todo;
  let id = req.params.id;
  console.log(updatedVal);
  console.log(id);
  let sqlQuery = "UPDATE todos SET todo = ? WHERE id = ?";
  dbConnect.query(sqlQuery, [updatedVal, id], (err, results) => {
    if (err) {
      throw err;
    }
    res.send({
      error: false,
      data: results,
      message: "TODO CONTENT UPDATED",
    });
  });

  console.log(req.params.id);
});

// Update / Toggle Complete Status
app.put("/api/todo/:id/status", (req, res) => {
  let initialStatus = req.body.complete;
  initialStatus == 0 ? (status = 1) : (status = 0);
  let id = req.params.id;
  let sqlQuery = "UPDATE todos SET complete = ? WHERE id = ?";
  dbConnect.query(sqlQuery, [status, id], (err, results) => {
    if (err) {
      throw err;
    }
    res.send({
      error: false,
      data: results,
      message: "TODO STATUS UPDATED",
    });
  });
});

// Delete Todo
app.delete("/api/todos/:id", (req, res) => {
  let id = req.params.id;
  let sqlQuery = "DELETE FROM todos WHERE id = ?";
  dbConnect.query(sqlQuery, id, (err, results) => {
    if (err) throw err;
    res.send({
      error: false,
      data: results,
      message: "TODO DELETED",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
