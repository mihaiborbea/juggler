var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: Date,
  status: {
    type: String,
    default: 'pending'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

ToDoSchema.plugin(mongoosePaginate);
const ToDoModel = mongoose.model('Todo', ToDoSchema);

module.exports = ToDoModel;
