var db = require('./config/pgpool');
var pool = db.getPool();

async function login (req, result) {
    
    try {        
        let res = await pool.connect();
        let passwd = "";
        const { stdout, stderr } = await exec("/usr/sbin/dovecotpw -s HMAC-MD5 -p "+req.passwd);        
        passwd = stdout;
        passwd = passwd.replace(/(\r\n|\n|\r)/gm, "");        
        res = await pool.query("SELECT * FROM users WHERE nick=$1",[req.login]);        
        if (res.rows.length == 0)  
        {
            await db.end();                
            return {status : 0, error : "Не дійсний логін "+req.login}; 
        }
        else if (passwd.length == 0 || res.rows[0].password != passwd)    
        {
            await db.end();                
            return {status : 0, error : "Неправильний пароль  ! "+req.login}; 
        }
        else
        {
            let res_p = await pool.query("SELECT * FROM prefer WHERE name='PATH_DOCS'");
            const ud = new Date('01-01-1970');
            const cd = new Date();
            const exp = cd.getTime()-ud.getTime();
            await pool.end();
            let _pool = new Pool({
                host: _host,
                port: _port,
                user: _user_name,
                password: _passwd,
                database: dbname                
            });
            set_pool(dbname,_pool);
            return {
                status : 1,
                path  : res_p.rows,
                // ip_oos: res_o.rows,
                token : {dbname:dbname, uid : res.rows[0].id, id_pers : res.rows[0].id_person, passwd : req.password, exp:exp, adm : res.rows[0].adm}
            };

        }
    }
    catch (e) {
        await db.end();                
        return {status : 0, error : e.message};       
    }    
}

module.exports = {
  login,
}
