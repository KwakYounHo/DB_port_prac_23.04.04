const mysql = require('mysql2');
// import mysql from 'mysql2';

const DB = mysql
  .createConnection({
    host     : '%',
    port     : 3306,
    user     : 'IAtest',
    password : '1234',
    database : 'IA'
  });

  DB.connect();
  DB.query('select * from user_information',(err,result,fields)=>{
    if (err) {
      throw err
    }else {
      console.log(result)};
  });
  DB.end();