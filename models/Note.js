let connexion  = require('./config/db');
class Note  {
    constructor (valeur = null, semestre = null, annee = null, matier =null, idEtudiant=null,id = null)
    {

        this.valeur = valeur;
        this.semestre = semestre;
        this.annee = annee;
        this.matier = matier;
        this.idEtudiant = idEtudiant;
        this.id = id;
    }

    static updateSelecte(idNote,value,item,cb)
    {
        connexion.query('UPDATE note set '+item +'= ? WHERE id = ?',
            [value,idNote],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }
    static getNoteByidEt(idEt,cb)
    {
        connexion.query('SELECT * FROM note WHERE idEt = ?',
            [idEt],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }
    static gets(cb){
        connexion.query('SELECT * FROM note',
            [],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }

    static show(id,cb){
        connexion.query('SELECT * FROM note where id = ?',
            [id],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result[0]);
            });
    }

    static create(note,cb)
    {
        connexion.query('INSERT INTO note SET valeur = ? ,annee= ? , semestre  =? , matier = ? , idEt = ?',
            [note.valeur,note.annee,note.semestre,note.matier,note.idEtudiant],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }
    static update(note,cb)
    {
        connexion.query('UPDATE note SET valeur = ? ,annee= ? , semestre  =? , matier = ? , idEt = ? where id = ?',
            [note.valeur,note.annee,note.semestre,note.matier,note.idEtudiant,note.id],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }

    static delete(note,cb)
    {
        connexion.query('DELETE FROM note WHERE id = ?',
            [note.id],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                cb(result);
            });
    }


    get _valeur() {
        return this.valeur;
    }

    set _valeur(value) {
        this.valeur = value;
    }

    get _semestre() {
        return this.semestre;
    }

    set _semestre(value) {
        this.semestre = value;
    }

    get _annee() {
        return this.annee;
    }

    set _annee(value) {
        this.annee = value;
    }

    get _matier() {
        return this.matier;
    }

    set _matier(value) {
        this.matier = value;
    }

    get _idEtudiant() {
        return this.idEtudiant;
    }

    set _idEtudiant(value) {
        this.idEtudiant = value;
    }

    get _id() {
        return this.id;
    }

    set _id(value) {
        this.id = value;
    }
}

module.exports = Note ;