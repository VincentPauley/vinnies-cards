require('dotenv').config();
r = require('rethinkdb');
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

app.use(closeConnection);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
