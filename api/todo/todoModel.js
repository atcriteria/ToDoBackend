const dbTodo = require("../../database/todos/Todo");

module.exports = {
    findEntry
}

// Takes a username and checks the DB
// for corresponding ToDo's
async function findEntry(un){
    const [query] = await dbTodo.find({username: un})
    return query
}