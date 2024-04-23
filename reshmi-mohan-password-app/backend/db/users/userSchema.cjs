const schema = require('mongoose').Schema;

module.exports =  new schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {collection: "User"});