let mysql = require('mysql');
let connexion =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'tpjquery'
});
connexion.connect();
module.exports = connexion;