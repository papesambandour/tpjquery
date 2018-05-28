let connexion  = require('./config/db');
class Etudiant  {
    constructor (mat = null ,prenom = null,nom =null,classe =null,id=null )
    {
        this.mat = mat;
        this.prenom = prenom;
        this.nom = nom;
        this.classe = classe;
        this.id = id;

    }


    get _mat() {
        return this.mat;
    }

    set _mat(value) {
        this.mat = value;
    }

    get _prenom() {
        return this.prenom;
    }

    set _prenom(value) {
        this.prenom = value;
    }

    get _nom() {
        return this.nom;
    }

    set _nom(value) {
        this.nom = value;
    }

    get _classe() {
        return this.classe;
    }

    set _classe(value) {
        this.classe = value;
    }

    get _id() {
        return this.id;
    }

    set _id(value) {
        this.id = value;
    }

    static gets(cb){
        connexion.query('SELECT * FROM etudiant ORDER BY mat asc',
            [],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }
    static getsSearch(item,cb)

    {
       // item = toUpperCase(item)
        connexion.query('SELECT * FROM etudiant   WHERE upper(mat) like"%'+item+'%" OR upper (nom)  like"%'+item+'%" OR upper(prenom)  like"%'+item+'%" or upper( class)  like"%'+item+'%" ORDER BY prenom asc',
            [],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }

    static show(id,cb){
        connexion.query('SELECT * FROM etudiant where id = ?',
            [id],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result[0]);
            });
    }

    static create(etudiant,cb)
    {
        connexion.query('INSERT INTO etudiant SET mat = ? ,nom= ? , prenom  =? , class = ?',
            [etudiant.mat,etudiant.nom,etudiant.prenom,etudiant.classe],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }
    static update(etudiant,cb)
    {
        connexion.query('update etudiant SET mat = ? ,nom= ? , prenom  =? , class = ? WHERE id = ?',
            [etudiant.mat,etudiant.nom,etudiant.prenom,etudiant.classe,etudiant.id],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }
    static delete(etudiant,cb)
    {
        connexion.query('DELETE FROM etudiant WHERE id = ?',
            [etudiant.id],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });

    }

}

module.exports = Etudiant ;

