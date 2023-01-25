var db = require('./config/pgpool');
var pool = db.getPool();

async function getOrg(request) {
    try {        
        let results= await  pool.query(`SELECT * from org WHERE id = $1`,[request.params.id]);
        console.log(results.rows);
        return results    
    }
    catch (e) {
        return {status : 1, error : e.message};       
    } 
}

module.exports = {
      getOrg 
}