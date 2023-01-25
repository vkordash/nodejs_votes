var db = require('./config/pgpool');
var pool = db.getPool();

async function getAdditions(id) {
    try {        
        let res= await  pool.query(`select * from sess.addition where id_prj=$1 order by pn`,[id]);
        return res.rows;
    }
    catch (e) {
        return {status : 1, error : e.message};       
    } 
}

module.exports = {
  getAdditions,
}