const { promise } = require('./db')
var conn = require('./db')

module.exports = {

    getEmails(){

        return new Promise((resolve, reject) =>{

            conn.query(`
                SELECT * FROM tb_emails ORDER BY id
            `, (err, results) =>{

                if(err){
                    reject(err)
                } else{
                    resolve(results)
                }

            });

        });

    }

}