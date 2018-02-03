var ToDoModel = require('../models/todo.model');

exports.getTodos = async function (query, options) {
  try {
    var todos = await ToDoModel.paginate(query, options);
    return todos;
  } catch (e) {
    throw Error('Error while Paginating Todos');
  }
};

exports.createTodo = async function (todo) {
  var newTodo = new ToDoModel({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status,
    author: todo.author
  });

  try {
    var savedTodo = await newTodo.save();
    return savedTodo;
  } catch (e) {
    throw Error('Error while Creating Todo');
  }
};

exports.updateTodo = async function (todo) {
  var id = todo.id;

  try {
    var oldTodo = await ToDoModel.findById(id);
  } catch (e) {
    throw Error('Todo could not be found');
  }

  if (!oldTodo) {
    return false;
  }

  oldTodo.title = todo.title;
  oldTodo.description = todo.description;
  oldTodo.status = todo.status;

  try {
    var savedTodo = await oldTodo.save();
    return savedTodo;
  } catch (e) {
    throw Error('An Error occured while updating the Todo');
  }
};

exports.deleteTodo = async function (id) {
  try {
    var deleted = await ToDoModel.remove({
      _id: id
    });
    console.log('HERE', deleted)
    if (deleted.result.n === 0) {
      throw Error('Todo Could not be deleted');
    }
    return deleted.result.n;
  } catch (e) {
    throw Error('Error Occured while Deleting the Todo');
  }
};
