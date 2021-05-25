const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema(
    {
        username: { type: String, required: true, unique: true },
        todos: []
    },
);

module.exports = mongoose.model('todos', Todo)