var pg = require('pg');
var pool;
var config = {
    host: '192.168.77.253',
    port: '5432',
    user: 'dc_user',
    password: 'vfhctkm2010',
    database: 'dc', 
};


async function runQuery (_query) {
  try {        
      let res= await  pool.query(_query);
      return res.rows;
  }
  catch (e) {
      return {status : 1, error : e.message};       
  } 
}

module.exports = {
    getPool: function () {
      if (pool) return pool; // if it is already there, grab it here
      pool = new pg.Pool(config);
      return pool;
    },
    runQuery,    
}