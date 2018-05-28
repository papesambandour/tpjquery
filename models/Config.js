let connexion  = require('./config/db');

class Config  {


    static get(label,cb){
        connexion.query('SELECT value FROM config WHERE label = ?',
            [label],function (err,result) {
                if(err)
                {
                    throw err ;
                }
                if(result.length > 0)
                {
                    cb(result[0].value);
                }
                else
                {
                    cb(null);
                }

            });
    }
    static set(label,value,cb)
    {
        if(label !=='' && label !== undefined && value >0)
        {
            Config.get(label,function (result) {
                if(result !== null)
                {
                    connexion.query('UPDATE config set  value = ? WHERE  label = ?',
                        [value,label],function (err,result) {
                            if(err)
                            {
                                throw err ;
                            }
                            cb(result);
                        });
                }
                else
                {
                    connexion.query('INSERT INTO config set label = ? , value = ?',
                        [label,value],function (err,result) {
                            if(err)
                            {
                                throw err ;
                            }
                            cb(result);
                        });
                }
            })
        }

    }

}

module.exports = Config ;