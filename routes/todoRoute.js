const express = require("express");
const router = express.Router();

const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController")

router.post("/add/todo", createTodo)
router.get("/all/todos", getTodos)
router.put("/update/todo/:id", updateTodo)
router.delete("/delete/todo/:id", deleteTodo)

module.exports = router;