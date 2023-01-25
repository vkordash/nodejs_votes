
const client = require("./db");

  const getAnswers = (request, response) => {
    //SELECT id, txt, pn FROM cards where typ_folder=1 and id_folder=247 and pn>0 and id_vid=0 order by pn
    // SELECT * FROM users ORDER BY id ASC
    client.query('SELECT id, txt, pn FROM cards where typ_folder=1 and id_folder=247 and pn>0 and id_vid=0 order by pn', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getAnswerById = (request, response) => {
    const id = parseInt(request.params.id)
    // SELECT * FROM users WHERE id = $1
    // SELECT id, txt, pn FROM cards where id = $1 and typ_folder=1 and id_folder=247 and pn>0 and id_vid=0 order by pn
    client.query('SELECT id, txt, pn FROM cards where id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  /*const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }*/
  
  module.exports = {
    getAnswers,
    getAnswerById,
 //   createUser,
  //  updateUser,
  //  deleteUser,
  }