//DECLARATION
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let url =  require('url');
let Config = require('./models/Config');
let Etudiant = require('./models/Etudiant');
let Note = require('./models/Note');

//PARAMS
app.set('view engine','ejs');

//USE MIDDLEWARE

app.use('/asset',express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//crrer un middleware


//ROOT
app.get('/',(request,response)=>{

    Etudiant.gets(function (result) {

        response.locals.etudiants =result;
       // console.log( response.locals.etudiants);
        response.render('page/home') ;
    });

});
//CONTROLLER ETUDIANT
////ADD ETUDIANT
app.get('/etudiant/create',function (request,response) {
    let query = url.parse(request.url,true).query;//le true done le query en objet
    let etudiant = new Etudiant(query.matE,query.prenomE,query.nomE,query.classE);
   Etudiant.create(etudiant,function (res) {
      // console.log(res,'rests')
       let lastInsertId = res.insertId ;
       let lastmat;
       Config.get('MAT',function (rest) {
           lastmat= parseInt(rest) + 1;
           Config.set('MAT',lastmat,function (rest) {
               response.send(lastInsertId+"");
           })
       })
   });
});
//ETID ETUDIANT
app.get('/etudiant/update',function (request,response) {
    let query = url.parse(request.url,true).query;//le true done le query en objet
    let etudiant = new Etudiant(query.mateEtu,query.prenomE,query.nomE,query.classE,query.idE);
   Etudiant.update(etudiant,function (res) {
       response.send(1+"");
   });
});
//delete etudiant
app.get('/etudiant/delete',function (request,response) {
    let query = url.parse(request.url,true).query;
   let etudiant = new Etudiant();
   etudiant.id =query.idE;
    Etudiant.delete(etudiant,function (res) {
        console.log(res)
        response.send("1");
    });

});

///LIST ETUD
app.get('/etudiant/gets',function (request,response) {
    Etudiant.gets(function (res) {
        response.send(JSON.stringify(res));
    })
});
///LIST ETUD
app.get('/etudiant/show',function (request,response) {
    let query = url.parse(request.url,true).query;
    Etudiant.show(query.idE,function (res) {
        console.log(query,'reee   ')
        response.send(JSON.stringify(res));
    })
});

app.get('/etudiant/getmat',function (request,response) {
    Config.get('MAT',function (res) {
        let resParsed = parseInt(res)
        resParsed++;
        response.send( resParsed +'');
    })
});
///etudiant search
app.get('/etudiant/search',function (request,response) {
    let query = url.parse(request.url,true).query;
    Etudiant.getsSearch(query.item,function (res) {
        response.send(JSON.stringify(res));
    })
});
//CONTROLLER NOTE
app.get('/note/create',function (request,response) {

    let query = url.parse(request.url,true).query;//le true done le query en objet
    let note = new Note(query.valeur,query.semestre,query.annee,query.matier,query.idE);
   Note.create(note,function (res) {
      // console.log(res,'rests')
       response.send(1+"");
   });
});
app.get('/note/shownoteetu',function (request,response) {

    let query = url.parse(request.url,true).query;//le true done le query en objet
   Note.getNoteByidEt(query.idEt,function (res) {
      // console.log(res,'rests')
       response.send(JSON.stringify(res));
   });
});

app.get('/note/updateSelect',function (request,response) {

    let query = url.parse(request.url,true).query;//le true done le query en objet
   Note.updateSelecte(query.idNote,query.itemValue,query.item,function (res) {
      // console.log(res,'rests')
       response.send("1");
   });
});
http://localhost:8080/note/updateSelect?idNote=13&itemValue=19&item=valeur







app.listen(8080);

