const client = require("./db");

  const getComis = (request, response) => {
    const id = parseInt(request.params.id)
    
    const query = {
      text: 'select id,name from sess.comisions where id_conv=$1 order by name',
      values: [id],
    }

    // select id,name from sess.comisions where id_conv in (select sess.sessions.id_conv from sess.sessions where sess.sessions.id = (select id_sess from sess.active_sess where id=$id)
    client.query(query, (error, results) => {
        if (error) {
          throw error
        }
        results.rows.unshift({name: 'Всі', id: 0});        
        response.status(200).json(results.rows)       
    })
    response.status(200)

  }
  
  
  module.exports = {
    getComis,
  }

  