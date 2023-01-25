var db = require('./config/pgpool');
var pool = db.getPool();
  
async function getAttachDocs(id) {
    try {             
        
        let results = await  pool.query(`SELECT id, (SELECT date_create FROM cards WHERE id = $1) as date_create, memo, typ, p7s FROM attach_docs WHERE id_card = $1`,[id]);        
        return results.rows;
    }
    catch (e) {
        return {status : 1, error : e.message};       
    } 
}

  
/*
function _get_fullname($rec,$dt)
	{
		
        $id_org = $id_pers = $_SESSION['sc_vote']['id_org'];	
		$year =  strftime("%Y", strtotime($dt));		
		$mon =  strftime("%m", strtotime($dt));	
		$path = "docs/".$id_org."/".$year."/".$mon."/".$rec['id'];
		if ($rec['typ'] == 1)
			$path .= "."."doc";
		else if ($rec['typ'] == 2)
			$path .= "."."pdf";
		else if ($rec['typ'] == 3)
			$path .= "."."xls";
		else if ($rec['typ'] == 0)
		{
			if (!file_exists($path))
				$path .= "."."txt";						
		}
		else if ($rec['typ'] == 5)
			$path .= "."."xlsx";
		else if ($rec['typ'] == 6)
			$path .= "."."docx";
		else if ($rec['typ'] == 7)
			$path .= "."."p7s";
		return $path;					
	}


*/



  module.exports = {
    getAttachDocs,
  }