var express = require('express');

var router = express.Router();
var ToDoController = require('../../controllers/todos.controller');
var authGuard = require('../../middlewares/auth.guard');

// Map each API to the Controller FUnctions

router.get('/', authGuard, ToDoController.getTodos);

router.post('/', authGuard, ToDoController.createTodo);

router.put('/:id', authGuard, ToDoController.updateTodo);

router.delete('/:id', authGuard, ToDoController.removeTodo);

module.exports = router;
