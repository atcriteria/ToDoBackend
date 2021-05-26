// handles the import and the declaration in one line!
const router = require('express').Router();
const Todo = require('../../database/todos/Todo');
const { findEntry } = require('./todoModel');
const validateToken = require('../middleware/validateToken');

router.get('/', (req, res) => {
    res.json({
        param1: "/update takes a user's todos and a valid token and updates the database"
    })
})

router.get('/fetch', validateToken, (req, res) => {
    const user = req.decodedJwt.username;
    Todo.find({username: user})
        .then(([data]) => {
            res.json(data)
        }, (err) => {
            res.json(err)
        })
})

// Checks to see if an entry exists for the user, if it does
// then we delete the current entry and update it with the new,
// otherwise we create an entry for them.

router.post('/update', validateToken, async (req, res) => {
    const username = req.decodedJwt.username;
    const todos = new Todo({
        username: username,
        todos: req.body
    })
    const [query] = await Todo.find({ username: username})
    if (query){
        await Todo.deleteOne({ username: username})
    }
    await todos.save()
    .then(res => {
        return res.json({ message: "Success"})
    })
    .catch(err => {
        return res.status(500)
    })
    
});

module.exports = router;