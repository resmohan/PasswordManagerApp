const schema = require('mongoose').Schema;

module.exports =  new schema({
    urlValue: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, {collection: "UserPassword", timestamps: true});