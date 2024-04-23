const schema = require('mongoose').Schema;

module.exports =  new schema({
    requester: {
        type: String,
        required: true
    },
    requestee: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'initial'
    },
    lastUpdateDate: {
        type: Date,
        default: Date.now
    }
}, {collection: "ShareRequest"});