var db = require('./config/pgpool');
var pool = db.getPool();

//Список виступаючих по питанню 
async function getSpeakers(id) {
    try {        
        let res= await  pool.query(`select * from sess.speakers where id_prj=$1 order by pn,id`,[id]);
        return res.rows;
    }
    catch (e) {
        return {status : 1, error : e.message};       
    } 
}

//статус користувача (Перевірка повторного запису на виступ)
async function getStatusSpeaker(id, id_pers) {
  try {        
      let res= await  pool.query(`select count(*) as cnt from sess.speakers where id_prj=$1 and id_pers = $2 and start is null `,[id, id_pers]);
      return res.rows;
  }
  catch (e) {
      return {status : 1, error : e.message};       
  } 
}

module.exports = {
  getSpeakers,
  getStatusSpeaker
}