const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Atsushi1998',
  database: 'niigata_sake_map'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  connection.query(
    'select * from data',
    (error,results) =>{
      // console.log(results);
      res.render('map.ejs',{data:results});
    }
  );
});

app.get('/index',(req,res) => {
  connection.query(
    'select * from data',
    (error,results) => {
      res.render('index.ejs',{data:results})
    }
  )
})

app.get('/index/:id',(req,res) => {
  connection.query(
    'select * from data where id = ?',
    [req.params.id],
    (error,results) => {
      res.render('index_to_id.ejs',{data:results[0]});
    }
  )
})

app.get('/map/:id',(req,res) => {
  connection.query(
    'select * from data where id = ?',
    [req.params.id],
    (error,results) => {
      res.render('ind_map.ejs',{data:results[0]});
    }
  )
})

app.listen(3000);
