var axios = require('axios')

module.exports.verifyToken = async function(userID, token) {
    try {
        if (userID == undefined || token == undefined){
            throw new Error("Token não existente")
        } 

        token = token.replace(/^"(.*)"$/, '$1');
        return token == global.token
    } catch (error) {
        return false;
    }
}