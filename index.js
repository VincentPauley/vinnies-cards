require('dotenv').config();
r = require('rethinkdb');
const uniqid = require('uniqid');
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
  r.table('cards')
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

app.get('/brands', (req, res) => {
  r.table('brands').run(req._rdbConn, (err, cursor) => {
    if (err) throw err;

    cursor.toArray((err, records) => {
      if (err) throw err;

      res.send(records);
    });
  });
});

app.get('/card-types', (req, res) => {
  r.table('cardTypes').run(req._rdbConn, (err, cursor) => {
    if (err) throw err;

    cursor.toArray((err, records) => {
      if (err) throw err;

      res.send(records);
    });
  });
});

app.get('/mlb-teams', (req, res) => {
  r.table('mlbTeams').run(req._rdbConn, (err, cursor) => {
    if (err) throw err;

    cursor.toArray((err, records) => {
      if (err) throw err;

      res.send(records);
    });
  });
});

// TODO: possible better option with primary key search
// r.table('authors').get('7644aaf2-9928-4231-aa68-4e65e31bf219').
//     run(connection, function(err, result) {
//         if (err) throw err;
//         console.log(JSON.stringify(result, null, 2));
//     });
app.get('/find-by-id/:id', (req, res) => {
  const id = req.params.id;

  r.table('cards')
    .filter(r.row('id').eq(id))
    .run(req._rdbConn, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
        if (err) throw err;

        if (result.length < 1) {
          return res.send({
            success: false,
            found: false,
            msg: `no match found for id: ${id}`
          });
        }

        if (result.length > 1) {
          return res.send({
            success: false,
            found: true,
            msg: `more than one record found for id: ${id}`
          });
        }

        return res.send({
          success: true,
          found: true,
          record: result[0]
        });
      });
    });
});

app.post('/new-card', (req, res) => {
  r.table('cards')
    .insert({
      id: uniqid(),
      created: new Date().toISOString(),
      name: req.body.name,
      team: req.body.team,
      brand: req.body.brand,
      position: req.body.position,
      year: parseInt(req.body.year),
      series: parseInt(req.body.series),
      series_number: parseInt(req.body.seriesNumber),
      cardType: req.body.cardType
      // seriesType: Base, TC, 86B, ...etc
    })
    .run(req._rdbConn, function(err, result) {
      if (err) throw err;

      if (result.inserted !== 1) {
        return res.send('ERROR: failed to generate record.');
      }

      res.send('Success.');
    });
});

app.delete('/card/:id', (req, res) => {
  const id = req.params.id.toString();

  r.table('cards')
    .filter(r.row('id').eq(id))
    .delete()
    .run(req._rdbConn, function(err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ success: false, msg: JSON.stringify(err) });
      }

      console.log('-result-');
      console.log(result);

      if (result.deleted !== 1) {
        return res
          .status(200)
          .send({ success: false, msg: 'failed to delete record.' });
      }

      res.status(200).send({ success: true, msg: 'record deleted.' });
    });
});

app.use(closeConnection);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
