const TodoService = require('../services/todos.service');
const User = require('../models/user.model');

exports.getTodos = async function (req, res, next) {
  const options = {
    page: req.query.page ? req.query.page : 1,
    limit: req.query.limit ? req.query.limit : 10,
    populate: req.query.include
  }
  try {
    const user = await User.findById(req.headers.userid);
    try {
      var todos = await TodoService.getTodos({ author: req.headers.userid }, options);
      return res.status(200).json({
        status: 200,
        result: todos,
        message: 'Todos Recieved Successfully'
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Invalid User'
    });
  }
};

exports.createTodo = async function (req, res, next) {
  try {
    const user = await User.findById(req.headers.userid);
    var todo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      author: req.headers.userid
    };
    console.log(req.headers)
    try {
      var createdTodo = await TodoService.createTodo(todo);
      return res.status(200).json({
        status: 201,
        result: createdTodo,
        message: 'Created ToDo Succesfully'
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Invalid User'
    });
  }
};

exports.updateTodo = async function (req, res, next) {
  // Id is necessary for the update
  if (!req.body._id) {
    return res.status(400).json({
      status: 400,
      message: 'Id must be present'
    });
  }

  var id = req.body._id;

  var todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  };

  try {
    var updatedTodo = await TodoService.updateTodo(todo);
    return res.status(200).json({
      status: 200,
      result: updatedTodo,
      message: 'Updated Todo Succesfully'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};

exports.removeTodo = async function (req, res, next) {
  var id = req.params.id;

  try {
    await TodoService.deleteTodo(id);
    return res.status(204).json({
      status: 204,
      message: 'Succesfully Todo Deleted'
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};
