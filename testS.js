const http  = require('http');
const fs    = require('fs').promises;
const qs    = require('qs');
const mysql = require('mysql2');

const DB = mysql
  .createConnection({
    host     : '%',
    port     : 3306,
    user     : 'IAtest',
    password : '1234',
    database : 'IA'
  });

  DB.connect(()=>{console.log('DB온')});
  
  const server = http.createServer(async (req,rep)=>{
    if (req.method === 'GET') {
      if (req.url === '/') {
        rep.writeHead(200, {'Content-Type':'text/html; charset=utf-8;', 'Set-Cookie':['myCookie=AAA','CookieTwo=AAG']})
        rep.end(await fs.readFile('./index.html','utf-8'))
      }
      if (req.url.includes('index02.html')) {
        rep.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
        rep.end(await fs.readFile('./index02.html','utf-8'));
      }
    } else if (req.method === 'POST') {
      if (req.url.includes('Notfor')) {
        let dataA='';
        req.on('data',(data)=>{
          dataA += data;
      })
      req.on('end',()=>{
        const DBGo = Object.values(qs.parse(dataA));
        DB.query(`insert into insert_test (text)
        values('${DBGo}')`,(err,result,fields)=>{
          if (err) {
            throw err
          }else {
            console.log(result)};
        });
      })
    }
  }
})
.listen(2080,(err)=>{
  if (err) {throw err} else {
    console.log('2080에서 서버 시작');
  }
})