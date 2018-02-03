var express = require('express');

var router = express.Router();
var ToDoController = require('../../controllers/todos.controller');
var authGuard = require('../../middlewares/auth.guard');

// Map each API to the Controller FUnctions

router.get('/:userId', authGuard, ToDoController.getTodos);

router.post('/:userId', authGuard, ToDoController.createTodo);

router.put('/', authGuard, ToDoController.updateTodo);

router.delete('/:id', authGuard, ToDoController.removeTodo);

module.exports = router;
