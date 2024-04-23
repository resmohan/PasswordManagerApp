const cookieHelper = require('../helper/cookieHelper.cjs');
const express = require('express')
const userModel = require('../db/users/userModel.cjs')

const router = express.Router();

// localhost:8000/api/users/register
router.post('/register', async function(request, response){
    const requestBody = request.body;
    const username = requestBody.username;

    const newUser = {
        username: username,
        password: requestBody.password
    }

    try{
        const createUserResponse = await userModel.insertUser(newUser);
        //set the cookie
        const cookieData = {username:username}
        cookieHelper.cookieEncryptor(cookieData, response)

        return response.send(createUserResponse)
    }catch(error){
        response.status(400);
        return response.send("Error in creating user with username "+username+" Error: "+error)
    }
})

// localhost:8000/users/login
router.post('/login', async function(request, response){
    const requestBody = request.body;
    const username = requestBody.username;

    const user = {
        username: username,
        password: requestBody.password
    }

    try{
        const findUserResponse = await userModel.findUser(user);
        //set the cookie
        const cookieData = {username:username}
        cookieHelper.cookieEncryptor(cookieData, response)

        return response.send(findUserResponse)
    }catch(error){
        response.status(400);
        return response.send("Error in finding user with username "+username+" Error: "+error)
    }
})

router.get('/loggedIn', function(request, response) {
    const username = cookieHelper.cookieDecryptor(request);

    if(username) {
        return response.send({
            username: username,
        });
    } else {
        response.status(400);
        return response.send('Not logged in');
    }
})

router.post('/logout', function(request, response) {
    cookieHelper.clearCookie(response)
    return response.send('Logged out');
});

router.get('/userExists/:username', async function(request, response){
    const username = request.params.username;
    try{
        const findUserResponse = await userModel.findByUserName(username);
        return response.send(findUserResponse);
    }catch(error){
        response.status(400);
        return response.send("Error in finding user: "+error)
    }
})

module.exports = router;