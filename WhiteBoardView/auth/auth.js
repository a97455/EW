var axios = require('axios')

module.exports.verifyToken = async function(userID, token) {
    try {
        let url;
        if (userID[0] === 'd') {
            url = 'http://localhost:10000/docentes/' + userID;
        } else if (userID[0] === 'a') {
            url = 'http://localhost:10000/alunos/' + userID;
        } else {
            throw new Error('Invalid userID');
        }

        const resposta = await axios.get(url);
        return token === resposta.data.token;
    } catch (error) {
        return false;
    }
}