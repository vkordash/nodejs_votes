var db = require('./config/pgpool');
var pool = db.getPool();

async function getResultVotes(id) {
    try {        
        let res= await  pool.query(`select * from sess.result  where id_prj=$1 and accepted in (0,1) order  by typ`,[id]);
        return res.rows;
    }
    catch (e) {
        return {status : 1, error : e.message};       
    } 
}
  
module.exports = {
    getResultVotes,
  }