const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
var jwt = require('jsonwebtoken');

const app = express();
const jsonParser = express.json();

const answers = require('./answers')
// const attachDocs = require('./attachDocs')
const resultVotes = require('./resultVotes')
const speakers = require('./speakers')
const additions = require('./additions')
const comis = require('./comis')
const org = require('./org.js')
const port = 3000



app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

const privateKey = "ключДляJWT@токена_dc";
app.use(express.json())
app.use((req, res, next) => {
    if (req.headers.auth)
    {        
        let token=JSON.parse(req.headers.auth);
        try
        {
            var info = jwt.verify(token, privateKey);   
            const cd = new Date();
            const exp = cd.getTime();
   
              req.query.uid     = info.uid;
              req.query.id_pers = info.id_pers;
              req.query.dbname  = info.dbname;
              req.query.passwd  = info.passwd;  
              req.query.adm     = info.adm;                      

        }
        catch(err)
        {
            res.status(400);      
        }        
    }
    next();
})


app.get("/login", jsonParser, async function(request, response){
  try {
      let r = await  db.login(request.query);
      if (r.status == 1)
      {
        var token = jwt.sign(r.token, privateKey);
        response.json(
          { // user  : cuser,                        
            path  : r.path,
            token : token,
            status: 1        
          }
        )              
      }   
      else
      {
        response.json(r);               
      }     
  }
  catch (err) 
  {
      response.json("error login "+err.message);
  }            
});

app.get('/answers', answers.getAnswers)
app.get('/answersCount', answers.getAnswersCount)

//app.get('/attachDocs/:id', attachDocs.getAttachDocs)
app.get('/additions/:id', additions.getAdditions)
app.get('/resultVotes/:id', resultVotes.getResultVotes)
app.get('/speakers/:id', speakers.getSpeakers)
app.get('/comis/:id', comis.getComis)
app.get('/answers/:id', answers.getAnswerById)
app.get('/org/:id', org.getOrg)

/*app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})*/

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})