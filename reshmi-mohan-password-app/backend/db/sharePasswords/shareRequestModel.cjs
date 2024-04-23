const mongoose = require('mongoose')
const shareRequestSchema = require('./shareRequestSchema.cjs')

const shareRequestModel = mongoose.model('ShareRequest', shareRequestSchema)

function insertShareRequest(shareRequest){
    return shareRequestModel.create(shareRequest);
}

function findByRequesterAndStatus(requester, status){
    return shareRequestModel.find({requester: requester, status:status}).exec();
}

function findByRequesteeAndStatus(requestee, status){
    return shareRequestModel.find({requestee: requestee, status:status}).exec();
}

function updateShareRequest(id, shareRequest){
    return shareRequestModel.findOneAndUpdate({_id:id}, shareRequest)
}

module.exports = {
    insertShareRequest,
    findByRequesterAndStatus,
    findByRequesteeAndStatus,
    updateShareRequest
}