const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI

const db = mongoose
    .connect(MONGODB_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        // These are used to prevent the deprecation warning 
        // for unique values in tables
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log('!~DB Connected~!')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

module.exports = db