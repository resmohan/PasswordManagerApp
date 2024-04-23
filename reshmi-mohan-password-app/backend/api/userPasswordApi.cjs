const express = require('express')
const cookieHelper = require('../helper/cookieHelper.cjs');
const userPasswordModel = require('../db/userPasswords/userPasswordModel.cjs')
const shareRequestModel = require('../db/sharePasswords/shareRequestModel.cjs')

const router = express.Router();

// localhost:8000/api/userPasswords/create
router.post('/create', async function(request, response){
    const requestBody = request.body;

    const username = cookieHelper.cookieDecryptor(request)
    if(!username) {
        response.status(401);
        return response.send("You need to be logged in to create a user password!")
    }

    const newUserPassword = {
        urlValue: requestBody.urlValue,
        password: requestBody.password,
        username: requestBody.username,
    }

    try{
        const createUserPasswordResponse = await userPasswordModel.insertUserPassword(newUserPassword);
        return response.send(createUserPasswordResponse)
    }catch(error){
        response.status(400);
        return response.send("Error in creating user password: "+error)
    }
})

//get user password details for a particular user
router.get('/:username', async function(request, response){
    try{
        const username = request.params.username;   
        const findUserPswdResponse = await userPasswordModel.findByUserName(username);
        return response.send(findUserPswdResponse);
    }catch(error){
        response.status(400);
        return response.send("Error in finding user password: "+error)
    }
})

//get user password details for a set of users - current user and shared ones
router.get('/', async function(request, response){
    const username = cookieHelper.cookieDecryptor(request)
    if(!username) {
        response.status(401);
        return response.send("You need to be logged in to query user passwords!")
    }

    try{
        let usernameArr =[]
        usernameArr.push(username);//add the logged in user as well

        //get user names who have approved share requests from current user
        let shareRequestResp = await shareRequestModel.findByRequesterAndStatus(username, 'approved')
        for(let i=0;i<shareRequestResp.length;i++){
            usernameArr.push(shareRequestResp[i].requestee)
        }

        //get user names whom the current user have approved to share passwords
        shareRequestResp = await shareRequestModel.findByRequesteeAndStatus(username, 'approved')
        for(let i=0;i<shareRequestResp.length;i++){
            usernameArr.push(shareRequestResp[i].requester)
        }

        const findUserPswdResponse = await userPasswordModel.findByUserNames(usernameArr);
        return response.send(findUserPswdResponse);
    }catch(error){
        response.status(400);
        return response.send("Error in finding user passwords: "+error)
    }
})

//update user password details
router.put('/:id', async function(request, response){
    const id = request.params.id;
    const userData = request.body;

    //confirm that the user is logged in
    const username = cookieHelper.cookieDecryptor(request)
    if(!username) {
        response.status(401);
        return response.send("You need to be logged in to update a user password!")
    }

    //confirm that the user is updating his own passwords
    const getUserPswdResponse = await userPasswordModel.findById(id);
    if(getUserPswdResponse != null && getUserPswdResponse.username !== username){
        response.status(401);
        return response.send("You are not authorized to update this user password!")
    }

    try{
        const updateUserPswdResponse = await userPasswordModel.updateUserPassword(id,userData)
        return response.send(updateUserPswdResponse);
    }catch(error){
        response.status(400);
        return response.send("Error in updating user passwords: "+error)
    }
})

router.delete('/:id', async function(request, response){
    const id = request.params.id;

    //confirm that the user is logged in
    const username = cookieHelper.cookieDecryptor(request)
    if(!username) {
        response.status(401);
        return response.send("You need to be logged in to delete a user password!")
    }

    //confirm that the user is deleting his own passwords
    const getUserPswdResponse = await userPasswordModel.findById(id);
    if(getUserPswdResponse != null && getUserPswdResponse.username !== username){
        response.status(401);
        return response.send("You are not authorized to delete this user password!")
    }

    try{
        const deleteUserPswdResponse = await userPasswordModel.deleteUserPassword(id)
        return response.send(deleteUserPswdResponse);
    }catch(error){
        response.status(400);
        return response.send("Error in deleting user passwords: "+error)
    }
})

module.exports = router;