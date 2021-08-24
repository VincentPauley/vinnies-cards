require('dotenv').config();
r = require('rethinkdb');
const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

function createConnection(req, res, next) {
  r.connect({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  })
    .then(function(conn) {
      req._rdbConn = conn;
      next();
    })
    .error(err => {
      console.log(err);
    });
}

function closeConnection(req, res, next) {
  req._rdbConn.close();
}

app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(createConnection);

app.get('/', (req, res) => {
  r.table('baseball')
    .run(req._rdbConn)
    .then(cursor => {
      return cursor.toArray();
    })
    .then(result => {
      res.send(JSON.stringify(result));
    })
    .error(err => {
      console.log(err);
    });
});

app.post('/new-card', (req, res) => {
  r.table('baseball')
    .insert({
      id: Math.floor(Math.random() * 500),
      name: req.body.name,
      team: req.body.team,
      brand: req.body.brand,
      position: req.body.position,
      year: req.body.year,
      series_number: req.body.series,
      single_player: req.body.singlePlayer
    })
    .run(req._rdbConn, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    });
});

app.use(closeConnection);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
