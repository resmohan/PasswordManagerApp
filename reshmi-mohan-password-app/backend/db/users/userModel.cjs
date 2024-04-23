const mongoose = require('mongoose')
const userSchema = require('./userSchema.cjs')

const userModel = mongoose.model('User', userSchema)

function insertUser(user){
    return userModel.create(user);
}

function findByUserName(username){
    return userModel.findOne({username: username}, {password:0}).exec();
}

function findUser(user){
    return userModel.findOne(user, {password:0}).exec();
}

module.exports = {
    insertUser,
    findByUserName,
    findUser
}