const {Pool} = require('pg'); 
let pool = new Pool({ 
    user : 'postgres',
    password : 'postgres',
    host : 'localhost',
    port : 5432,
    database : 'daya-rekadigital-indo',
    idleTimeoutMillis : 1000 
});

pool.query(`SELECT * FROM "Customer";`, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

module.exports = pool