
const client = require("./db");

var db = require('./config/pgpool');
var pool = db.getPool();
const attachDocs = require("./attachDocs")
const Card = require("./card")
const resultVotes = require("./resultVotes")
const speakers = require("./speakers")
const additions = require("./additions")

  
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getTextSearch = (title) => {
  var condition = title ? ` and txt like "%${title}%" ` : '';
  return condition;
};

const getComis = (_comis) => {
  const comis = _comis ? _comis : 0;
  return {comis};
};


async function getAnswers (request, response){
    
    const { page, size, title, comis, first, rows  } = request.query;
    console.log(request.query);
    var condition = " "; //getTextSearch(title);
    //const { limit, offset } = getPagination(page, size);
    const limit=request.query.rows;
    const offset=request.query.first;

    const _comis = getComis(comis);
    console.log('Limit ',limit);
    console.log('Offset ',offset);
    console.log('Comis ',comis);
    console.log('Title ',condition);
   
  if (_comis>0){
    //$qr = "select txt, id,rn,date from cards where id_folder=$id_sess and pn>0 and id_vid=0 and id in (select id_prj from sess.pd_comis where id_comis=$id_comis) order by pn";
		var  qr = {
      text: 'SELECT id, txt, pn FROM cards where typ_folder=1 and id_folder=247 and pn>0 and id_vid=0 and id in (select id_prj from sess.pd_comis where id_comis=$3) order by pn offset $1 limit $2',
      values: [offset,limit,_comis]
    }       
	}
	else {
		var qr = {
      text: 'SELECT id, txt, pn FROM cards where typ_folder=1 and id_folder=247 and pn>0 and id_vid=0 order by pn offset $1 limit $2',
      values: [offset,limit]
    }
  }   
  var _rows = await db.runQuery(qr);
  response.status(200).json(_rows);    
}
  

async function getAnswersCount (request, response){
    
    const {title, comis } = request.query;
    var condition = " "; //getTextSearch(title);
    const _comis = getComis(comis);
    console.log('Comis ',comis);
    console.log('Title ',condition);
    

  if (_comis>0){
    var  qr = {
      text: 'SELECT count(*) as cnt FROM cards where typ_folder=1 and id_folder=247 and pn>0 and id_vid=0 and id in (select id_prj from sess.pd_comis where id_comis=$1)',
      values: [_comis]
    }    
	}
	else {
		var qr = {
      text: 'SELECT count(*) as cnt FROM cards where typ_folder=1 and id_folder=247 and pn>0 and id_vid=0',
      values: []
    }
  }  
  console.log(qr);
  var count = await  db.runQuery(qr);
  console.log(count[0].cnt);  
//  response.status(200).json({"totalRecords":count[0].cnt});    
  response.status(200).json(count[0].cnt);     
    
}


  async function getAnswerById(request, response) {
    try {     
        const id = parseInt(request.params.id)
        let data = {};
        data.card = await Card.getCard(id)
        data.attach  = await attachDocs.getAttachDocs(id)
        data.additions = await additions.getAdditions(id)
        data.speakers = await speakers.getSpeakers(id)
        data.votes = await resultVotes.getResultVotes(id)
        console.log(data);               
        response.status(200).json(data)
    }
    catch (e) {
        return {status : 1, error : e.message};       
    } 
  }
  
  module.exports = {
    getAnswers,
    getAnswersCount,
    getAnswerById,
  }