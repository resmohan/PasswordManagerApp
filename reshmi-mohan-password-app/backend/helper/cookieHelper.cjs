const jwt = require('jsonwebtoken')

const TOKEN_SECRET = 'PASSWORD_MANAGER_SECRET';

function cookieDecryptor(request) {
    if (!request.cookies || !request.cookies.token) {
        return false;
    } else {
        const token = request.cookies.token;  
        try {
            return jwt.verify(token, TOKEN_SECRET).username;
        } catch (error) {
            console.log("Error in cookieDecryptor: "+error);
            return false;
        }
    }
}

function cookieEncryptor(cookieData, response){
    try {
        const token = jwt.sign(cookieData, TOKEN_SECRET, {
            expiresIn: '1d'
        });

        response.cookie('token', token, {httpOnly: true, secure: true, sameSite: "None"});
    } catch (error) {
        console.log("Error in cookieEncryptor: "+error);
    }
}

function clearCookie(response){
    try{
        response.clearCookie('token');
    } catch (error) {
        console.log("Error in clearCookie: "+error);
    }
}

module.exports = {
    cookieDecryptor,
    cookieEncryptor,
    clearCookie
}