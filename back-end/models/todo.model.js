var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ToDoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  status: String
});

ToDoSchema.plugin(mongoosePaginate);
exports.ToDoModel = mongoose.model('Todo', ToDoSchema);
