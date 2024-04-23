const express = require('express')
const cookieHelper = require('../helper/cookieHelper.cjs');
const shareRequestModel = require('../db/sharePasswords/shareRequestModel.cjs')

const router = express.Router();

// localhost:8000/api/shareRequests/create
// create a new password share request
router.post('/create', async function(request, response){
    const requestBody = request.body;

    const newShareRequest = {
        requester: requestBody.requester,
        requestee: requestBody.requestee
    }

    try{
        const createShareRequestResponse = await shareRequestModel.insertShareRequest(newShareRequest);
        return response.send(createShareRequestResponse)
    }catch(error){
        response.status(400);
        return response.send("Error in creating share request: "+error)
    }
})

//get all pending notifications for the current user
router.get('/', async function(request, response){
    const username = cookieHelper.cookieDecryptor(request)
    if(!username) {
        response.status(401);
        return response.send("You need to be logged in to query the share password notifications!")
    }
    
    try{
        const findShareReqResponse = await shareRequestModel.findByRequesteeAndStatus(username,'initial');
        return response.send(findShareReqResponse);
    }catch(error){
        response.status(400);
        return response.send("Error in finding share requests: "+error)
    }
})

router.put('/:id', async function(request, response){
    const id = request.params.id;
    const shareReqData = request.body;
    try{
        const updateShareReqResponse = await shareRequestModel.updateShareRequest(id,shareReqData)
        return response.send(updateShareReqResponse);
    }catch(error){
        response.status(400);
        return response.send("Error in updating share request: "+error)
    }
})

module.exports = router;