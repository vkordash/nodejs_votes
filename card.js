var db = require('./config/pgpool');
var pool = db.getPool();

async function getCard(id) {
    try {        
        let res= await  pool.query(`select * from cards where id=$1`,[id]);
        return res.rows;
    }
    catch (e) {
        return {status : 1, error : e.message};       
    } 
}

module.exports = {
    getCard,
  }