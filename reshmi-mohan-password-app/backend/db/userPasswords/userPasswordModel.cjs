const mongoose = require('mongoose')
const userPasswordSchema = require('./userPasswordSchema.cjs')

const userPasswordModel = mongoose.model('UserPassword', userPasswordSchema)

function insertUserPassword(userPassword){
    return userPasswordModel.create(userPassword);
}

function findById(id){
    return userPasswordModel.findById(id).exec();
}

function findByUserName(username){
    return userPasswordModel.find({username: username}).exec();
}

function findByUserNames(usernameArr){
    return userPasswordModel.find({username: {'$in': usernameArr}}).sort('username').exec();
}

function findByUserNamesAndUrl(usernameArr, urlValue){
   return userPasswordModel.find({username: {'$in': usernameArr}, urlValue: {'$regex': urlValue, '$options': 'i'}}).sort('username').exec();
}

function updateUserPassword(id, userPassword){
    return userPasswordModel.findOneAndUpdate({_id:id}, userPassword)
}

function deleteUserPassword(id){
    return userPasswordModel.findOneAndDelete({_id:id})
}

module.exports = {
    insertUserPassword,
    findById,
    findByUserName,
    findByUserNames,
    findByUserNamesAndUrl,
    updateUserPassword,
    deleteUserPassword
}